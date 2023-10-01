import { Controller, Get, Post } from '@nestjs/common';
import { questions as exampleQuestions } from 'src/examples/questions';
import {
  GetAllQuestionsResponseDTO,
  GetResultsResponseDTO,
  SubmitAnswerResponseDTO,
} from 'src/models/DTOs';

@Controller('quiz')
export class QuizController {
  @Get('/questions')
  async getAllQueststions(): Promise<GetAllQuestionsResponseDTO> {
    const questions =
      exampleQuestions as GetAllQuestionsResponseDTO['questions'];

    return {
      questions,
      size: questions.length,
    };
  }

  @Post('/answers')
  async submitAnswer(): Promise<SubmitAnswerResponseDTO> {
    return {
      roles: [],
    };
  }

  @Get('/results')
  async getResults(): Promise<GetResultsResponseDTO> {
    return {} as any;
  }
}
