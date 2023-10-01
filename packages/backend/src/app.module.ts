import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [QuizModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
