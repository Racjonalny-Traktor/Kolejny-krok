import { Injectable } from "@angular/core";
import { Observable, of, tap } from "rxjs";

import { Question } from "../dto";

@Injectable({providedIn: 'root'})
export class QuizService {

    private questions: Question[];

    fetchQuestions(): Observable<Question[]>{
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