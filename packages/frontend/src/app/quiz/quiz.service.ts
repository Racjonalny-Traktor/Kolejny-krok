import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Question } from "../dto";

@Injectable({providedIn: 'root'})
export class QuizService {

    fetchQuestions(): Observable<Question[]>{
        return of([
            {
                answers: [{description: 'Jabłkiem', answerId: '0'}, {description: 'Parówką', answerId: '1'}], 
                description: 'Jakim warzywem chciałbyś być ?', 
                questionId: 0
            },
            {
                answers: [{description: 'Jabłkiem', answerId: '0'}, {description: 'Parówką', answerId: '1'}], 
                description: 'Jakim zwierzęciem chciałbyś być ?', 
                questionId: 1},
        ]);
    }

    submitAnswers(answers: number[]): Observable<any> {
        return of();
    }

    // fetchQuestions1(): Observable<QuestionDTO[]> {
    //     return 
    // }
}