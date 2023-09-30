import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Question } from "./quiz.model";

@Injectable({providedIn: 'root'})
export class QuizService {

    fetchQuestions(): Observable<Question[]>{
        return of([
            {answers: ['Jabłkiem', 'Parówką', 'Gruszką'], chosenAnswer: 0, questionText: 'Jakim warzywem chciałbyś być ?'},
            {answers: ['Psem', 'kotem', 'Pietruszką'], chosenAnswer: 0, questionText: 'Jakim zwierzęciem chciałbyś być ?'},
        ]);
    }

    submitAnswers(answers: number[]): Observable<any> {
        return of();
    }
}