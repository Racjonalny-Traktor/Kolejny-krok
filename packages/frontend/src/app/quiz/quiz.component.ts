import { Component, OnInit } from '@angular/core';
import { QuizService } from './quiz.service';
import { Question } from '../dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit{
 
  question = 'Jakim warzywem chciałbyś być ?'
  currentQuestion = 0;
  questions: Question[] = [];

  userCurrentAnswer = -1;

  funFacts = [
    {role: 'Pielęgniarka', description: 'Dlaczego pielęgniarka je parówki o 12 ? Nie wiem, to jest tylko placeholder'},
    {role: 'Programista', description: 'Dlaczego programista je kukurydze o 12 ? Nie wiem, to jest tylko placeholder'},
  ];

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.quizService.fetchQuestions().subscribe ({
      next: (questions: Question[]) => {
        this.questions = questions;
      }
    });
  }

  isPreviousButtonDisabled() {
    return this.currentQuestion === 0;
  }

  onPreviousQuestionClick() {
    this.currentQuestion -= 1;
  }

  goToNextQuestion() {
    this.currentQuestion += 1;
    this.quizService.fetchQuestion(this.currentQuestion).subscribe (
      (question: Question) => {
        this.questions.push(question);
      }
    );
  }

  onAnswerClick(index: number) {
    this.quizService.submitAnswer(this.currentQuestion, index).subscribe({
      next: () => {
        if(!this.isFinalQuestion())
          this.goToNextQuestion();
        else {
          this.router.navigate(['result']);
        }
      }
    });
  }

  isFinalQuestion() {
    return this.currentQuestion === 9;
  }

  showFunFuct() {
    return false;
  }

}
