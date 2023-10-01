import { Injectable } from "@angular/core";
import { Observable, map, of, tap } from "rxjs";

import { Question } from "../dto";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class QuizService {

    private questions: Question[];

    private apiPath = 'http://localhost:3000/v1/quiz/';

    constructor(private http: HttpClient) {}
    fetchQuestions(): Observable<Question[]>{
        return this.http.get<any>(`${this.apiPath}questions`)
            .pipe(
                map(result => result.questions),
                tap((questions: []) => {this.questions = questions})
            );
        return of([
            {
                answers: [
                    {description: 'Zdecydowanie tak', answerId: '0'}, 
                    {description: 'Raczej tak', answerId: '1'},
                    {description: 'Raczej nie', answerId: '2'},
                    {description: 'Zdecydowanie nie', answerId: '3'}
                ], 

                description: 'Czy lubisz zwierzęta ?', 
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