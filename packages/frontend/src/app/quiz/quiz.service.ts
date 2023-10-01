import { Injectable } from "@angular/core";
import { Observable, map, of, tap } from "rxjs";

import { Question, SubmitAnswerDTO } from "../dto";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class QuizService {

    private questions: Question[];

    private apiPath = 'https://tabesco.serveo.net/v1/quiz/';

    constructor(private http: HttpClient) {}

    fetchQuestions(): Observable<Question[]>{
        return this.http.get<any>(`${this.apiPath}questions`)
            .pipe(
                map(result => result.questions),
                tap((questions: []) => {this.questions = questions})
            );
    }

    fetchQuestion(questionId: number): Observable<Question> {
        return of({questionId: 0,
        answers: [
            {
                answerId: '0',
                description: "#0:I will never loose any money bro :)"
            },
            {
                answerId: '1',
                description: "#1:I will never loose any money bro :)"
            },
            {
                answerId: '2',
                description: "#2:I will never loose any money bro :)"
            },
            {
                answerId: '3',
                description: "#3:I will never loose any money bro :)"
            }
        ], description: ''});
        return this.http.get<any>(`${this.apiPath}question`);
    }

    submitAnswer(questionId: number, answerId: number) {
        let submitAnswerDTO: SubmitAnswerDTO = {
            questionId: questionId.toString(),
            answerId: answerId.toString()
        };
        console.log(`Question ${questionId}, answer: ${answerId}`);
        return of({});
        return this.http.post(`${this.apiPath}answer`, submitAnswerDTO);
    }

    submitAnswers(answers: number[]): Observable<any> {
        return of({});
    }
}