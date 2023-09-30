import { Component, OnInit } from '@angular/core';
import { Question } from './quiz.model';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit{
 
  question = 'Jakim warzywem chciałbyś być ?'
  currentQuestion = 0;
  questions: Question[] = [];

  userAnswers = []
  userCurrentAnswer = -1;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.fetchQuestions().subscribe ({
      next: (questions: Question[]) => {
        this.questions = questions;
      }
    });
  }

  isNextButtonDisabled() {
    return this.currentQuestion >= this.questions.length-1;
  }

  isPreviousButtonDisabled() {
    return this.currentQuestion === 0;
  }

  onPreviousQuestionClick() {
    this.currentQuestion -= 1;
  }

  onNextQuestionClick() {
    this.currentQuestion += 1;
  }
}
