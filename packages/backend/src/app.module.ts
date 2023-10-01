import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuizModule } from './quiz/quiz.module';
import { RolesService } from './roles/roles.service';

@Module({
  imports: [QuizModule],
  controllers: [AppController],
  providers: [RolesService],
})
export class AppModule {}
