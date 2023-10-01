import { Answer } from './answer';

export interface Question {
  questionId: number;
  description: string;
  answers: Omit<Answer, 'questionId'>[];
}
