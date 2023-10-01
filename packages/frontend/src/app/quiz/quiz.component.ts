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

  userAnswers = [-1, -1, -1, -1, -1]
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

  isNextButtonDisabled() {
    if(this.userAnswers[this.currentQuestion] === -1) 
      return true;
    if(this.isFinalQuestion()) {
      return false
    }
    return this.currentQuestion >= this.questions.length-1;
  }

  isPreviousButtonDisabled() {
    return this.currentQuestion === 0;
  }

  onPreviousQuestionClick() {
    this.currentQuestion -= 1;
  }

  onNextQuestionClick() {
    if(this.isFinalQuestion()){
      this.submitAnswers();
    }
    else {
      this.currentQuestion += 1;
    }
  }

  onAnswerClick(index: number) {
    this.userAnswers[this.currentQuestion] = index;
    this.onNextQuestionClick();
  }

  isFinalQuestion() {
    return this.currentQuestion === this.questions.length - 1;
  }

  submitAnswers() {
    this.quizService.submitAnswers(this.userAnswers).subscribe(
      {
        next: () => {
          this.router.navigate(['./result']);
        }
      }
    );
  }

  showFunFuct() {
    return false;
  }

}
