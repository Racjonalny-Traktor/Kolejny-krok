import { Answer } from './answer';
import { Question } from './question';

export interface GetAllQuestionsResponseDTO {
  questions: Question[];
  size: number;
}

export interface SubmitAnswerDTO {
  answers: Pick<Answer, 'answerId' | 'questionId'>[];
}

export interface SubmitAnswerResponseDTO {
  roles: any[];
}

export interface GetResultsResponseDTO {
  data: any;
}
