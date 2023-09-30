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

  userAnswers = [-1, -1, -1, -1, -1]
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
    if(this.userCurrentAnswer === -1) 
      return true;
    if(this.isFinalQuestion()) {
      return false
    }
    return this.currentQuestion >= this.questions.length-1 || this.userCurrentAnswer === -1;
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
      this.userCurrentAnswer = -1;
    }
  }

  onAnswerClick(index: number) {
    this.userCurrentAnswer = index;
    this.userAnswers[this.currentQuestion] = index;
  }

  isFinalQuestion() {
    return this.currentQuestion === this.questions.length - 1;
  }

  submitAnswers() {
    this.quizService.submitAnswers(this.userAnswers).subscribe(
      {
        next: () => {
          
        }
      }
    );
  }
}
