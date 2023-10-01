import { Module } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { QuizController } from './quiz.controller';

@Module({
  controllers: [QuizController],
  providers: [RolesService],
})
export class QuizModule {}
