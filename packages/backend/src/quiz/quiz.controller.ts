import { Body, Controller, Get, Post, Logger } from '@nestjs/common';

import { questions as exampleQuestions } from 'src/examples/questions';
import {
  GetAllQuestionsResponseDTO,
  GetResultsResponseDTO,
  SubmitAnswerDTO,
  SubmitAnswerResponseDTO,
} from 'src/models/DTOs';

@Controller('quiz')
export class QuizController {
  private readonly logger = new Logger(QuizController.name);

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
  async submitAnswer(
    @Body() answers: SubmitAnswerDTO,
  ): Promise<SubmitAnswerResponseDTO> {
    this.logger.log(JSON.stringify(answers));
    return {
      roles: [],
    };
  }

  @Get('/results')
  async getResults(): Promise<GetResultsResponseDTO> {
    return {} as any;
  }
}
