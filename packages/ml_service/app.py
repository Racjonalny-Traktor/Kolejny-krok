# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('stopwords')

import os
import spacy
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd
import random
import json

def compare_context(text1, text2):

    def preprocess_and_vectorize(text):
        doc = nlp(text)
        tokens = [token.text for token in doc if not token.is_stop and not token.is_punct]
        clean_text = ' '.join(tokens)
        vec = nlp(clean_text).vector
        return vec

    nlp = spacy.load("pl_core_news_md")

    vec1 = preprocess_and_vectorize(text1)
    vec2 = preprocess_and_vectorize(text2)

    similarity = cosine_similarity([vec1], [vec2])[0][0]

    return similarity

def load_csv():
    # csv_filename = 'occupations.csv'
    # df = pd.read_csv(csv_filename)
    csv_path = os.path.join(os.getcwd(), 'packages/ml_service/')
    csv_filename = 'occupations.csv'
    path_to_csv = os.path.join(csv_path, csv_filename)
    df = pd.read_csv(path_to_csv)
    return df

def data_preparation(df):
    del df['name'] # similar to fullName
    del df['description'] # similar to shortDescription
    # del df['jobDescription'] # lots of useless information, similar to shortDescription
    # |del df['professionalStream'] # similar to fullName, and some nulls
    del df['employers'] # feature not well implemented by mapa karier
    del df['isRegulated'] # not relevant
    del df['regulationDescription'] # useless, missing data
    del df['simillarOccupations'] # not needed now, can be used in future to boost given groups of similar careers

    df['marketSize'] = df['marketSize'].apply(_map_marketSize)
    df['salary'] = df['salary'].apply(_map_salary)

    column_mapping = {'math': 'matematyka',
                      'biology': 'biologia',
                      'physics': 'fizyka',
                      'technics': 'technika',
                      'polish': 'polski',
                      'english': 'angielski',
                      'geography': 'geografia',
                      'history': 'historia',
                      'wos': 'wiedza o społeczeństwie',
                      'chemistry': 'chemia',
                      'informatics': 'informatyka',
                      'art': 'plastyka',
                      'music': 'muzyka'
                      }
    df.rename(columns=column_mapping, inplace=True)

    subject_list = column_mapping.values()
    for subject in subject_list:
        df[subject] = df[subject].apply(_map_subject, col_name=subject)
    
    df['futureJob'].apply(lambda x: 'Zawód przyszłości.' if x else '')
    df['education'] = df['education'].fillna('')
    
    df.set_index('id', inplace=True)

def _map_marketSize(value):
    word_mapping = {
        'ŚREDNI': '',
        'MAŁY': '',
        'DUŻY': 'Dużo miejsc pracy.',
        'B.MAŁY': '',
        'B.DUŻY': 'Dużo miejsc pracy.',
         np.nan: ''
        
    }
    return word_mapping.get(value, value)

def _map_salary(value):
    word_mapping = {
        'B.DUŻE': 'Duże zarobki.',
        'ŚREDNIE': '',
        np.nan: '',
        'DUŻE': 'Duże zarobki.',
        'MAŁE': '',
        'B.MAŁE': ''
        
    }
    return word_mapping.get(value, value)

def _map_subject(value, col_name):
    word_mapping = {
        1: '',
        2: '',
        3: f'Wymagany {col_name}.',
        4: f'Wymagany {col_name}.',
        
    }
    return word_mapping.get(value, value)

def merge_columns(df):
    merged_column = df.apply(lambda row: ' '.join(row.astype(str)), axis=1)
    merged_df = pd.DataFrame({'description': merged_column})
    merged_df['description'] = merged_df['description'].str.replace('\xa0', '')
    merged_df['description'] = merged_df['description'].str.replace('\r', '')
    merged_df['description'] = merged_df['description'].str.replace('\n', '')
    merged_df['description'] = merged_df['description'].str.replace('--', '')
    merged_df['description'] = merged_df['description'].str.replace('//', '')
    merged_df.index = df.index

    return merged_df

def save_json(career_results):
    json_path = os.path.join(os.getcwd(), 'packages/ml_service/')
    file_name = "career_results.json"
    path_to_json = os.path.join(json_path, file_name)

    with open(file_name, "w") as json_file:
        # Use json.dump to write the dictionary to the file
        json.dump(career_results, json_file)

def load_json(file_name):

    json_path = os.path.join(os.getcwd(), 'packages/ml_service/')
    path_to_json = os.path.join(json_path, file_name)

    with open(path_to_json, "r") as json_file:
        loaded_data = json.load(json_file)
        return loaded_data

def solve(career_results, df, question, answer):

    for key, value in career_results.items():
        random_number = random.random()

        if random_number < 0.01:
            career_results[key] = value + compare_context(df.loc[int(key), 'description'], question) * answer

    return career_results

def return_solution(career_results, df_input):

    top_3_careers = sorted(career_results, key=lambda k: career_results[k], reverse=True)[:3]
    int_list = list(map(int, top_3_careers))

    result = df_input[df_input['id'].isin(int_list)]

    return result

def get_answer(value):
    if value == 0:
        return 1
    elif value == 1:
        return 0.5
    elif value == 2:
        return -0.5
    elif value == 3:
        return -1
    else:
        raise ValueError(f'There is no such answer as {value}!')
    
def get_question(id):
    json_path = os.path.join(os.getcwd(), 'packages/ml_service/')
    file_name = 'questions.json'
    path_to_json = os.path.join(json_path, file_name)
    with open(path_to_json, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    for item in data:
        if item.get('id') == id:
            return item.get('question')
    
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/calculate', methods=['GET', 'POST'])
def calculate():
    data = request.get_json()

    if not data or 'id' not in data or 'answer' not in data:
        return jsonify({"error": "Both 'id' and 'answer' must be provided"}), 400
    
    # data = {
    # "id": 3,
    # "answer": 0
    # }
    json_data = json.dumps(data)
    print(json_data)
    current_path = os.getcwd()
    print("Current Path:", current_path)
    df_input = load_csv()
    df = df_input.copy()
    data_preparation(df)
    df = merge_columns(df)
    career_results = load_json('career_results.json')
    career_results = solve(career_results, df, get_question(data['id']), get_answer(data['answer']))
    save_json(career_results)
    result = return_solution(career_results, df_input)
    print(result)
    json_result = result.to_json(orient='records')
    print(json_result)
    return jsonify(json_result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
