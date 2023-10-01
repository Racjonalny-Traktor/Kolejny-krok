import { Body, Controller, Get, Post, Logger, Param } from '@nestjs/common';

const fetch = (...args) => {
  // @ts-ignore
  return import('node-fetch').then(({ default: fetch }) => fetch(...args));
};

import {
  getLinkForFindingUniveristies,
  getLinkToGenerateInfoGraphics,
} from 'src/ela/urls';

import { questions as exampleQuestions } from 'src/examples/questions';
import {
  GetAllQuestionsResponseDTO,
  GetResultsResponseDTO,
  SubmitAnswerDTO,
  SubmitAnswerResponseDTO,
  SubmitSingleAnswerDTO,
} from 'src/models/DTOs';
import { Root } from 'src/models/graphics';
import { RolesService } from 'src/roles/roles.service';

@Controller('quiz')
export class QuizController {
  private readonly logger = new Logger(QuizController.name);

  constructor(private readonly rolesService: RolesService) {}

  @Get('/questions')
  async getAllQueststions(): Promise<GetAllQuestionsResponseDTO> {
    const questions =
      exampleQuestions as GetAllQuestionsResponseDTO['questions'];

    return {
      questions,
      size: questions.length,
    };
  }

  @Post('/answer')
  async submitSingleAnswer(
    @Body() answer: SubmitSingleAnswerDTO,
  ): Promise<void> {
    this.logger.log(JSON.stringify(answer));
    return;
  }

  @Post('/answers')
  async submitMultipleAnswers(
    @Body() answers: SubmitAnswerDTO,
  ): Promise<SubmitAnswerResponseDTO> {
    this.logger.log(JSON.stringify(answers));
    return {
      roles: [],
    };
  }

  @Get('/results/:name')
  async getResults(
    @Param('name') name: string,
  ): Promise<GetResultsResponseDTO | any> {
    const code =
      await this.rolesService.findUniversitiesWithSpecificEducation(name);
    this.logger.debug(`Got the CODE: ${code}`);

    const link = getLinkForFindingUniveristies(code);

    try {
      const html = await fetch(link);
      const response = (await html.json()) as Root;

      const insitutions = response.data.map((university) => {
        const link = university.major?.links[0]?.link;

        const seachParams = new URLSearchParams(link);

        return seachParams.get('institution');
      });

      this.logger.debug(`Institutions: ${insitutions}`);

      const linksToGenerateInfoGraphics = insitutions.map(
        getLinkToGenerateInfoGraphics,
      );

      return linksToGenerateInfoGraphics;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
