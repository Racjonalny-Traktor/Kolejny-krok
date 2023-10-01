import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

import { Question } from "../dto";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class QuizService {

    private questions: Question[];

    private apiPath = 'localhost:3000/v1/quiz/';

    constructor(private http: HttpClient) {}

    fetchQuestions(): Observable<Question[]>{
        return this.http.get<Question[]>(`${this.apiPath}/questions`);
        return of([
            {
                answers: [
                    {description: 'Jabłkiem', answerId: '0'}, 
                    {description: 'Parówką', answerId: '1'},
                    {description: 'Sokiem', answerId: '2'},
                    {description: 'Żwirkiem', answerId: '3'}
                ], 

                description: 'Jakim warzywem chciałbyś być ?', 
                questionId: 0
            },
            {
                answers: [{description: 'Jabłkiem', answerId: '0'}, {description: 'Parówką', answerId: '1'}], 
                description: 'Jakim zwierzęciem chciałbyś być ?', 
                questionId: 1
            }
        ]).pipe(tap((questions: []) => {this.questions = questions}));

    }

    submitAnswers(answers: number[]): Observable<any> {
        return of([]);
    }
}