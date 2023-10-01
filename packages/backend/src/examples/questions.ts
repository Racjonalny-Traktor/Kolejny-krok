import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

const answer: Pick<Answer, 'description'> = {
  description: 'I will never loose any money bro :)',
};

const question: Pick<Question, 'description'> = {
  description: 'Love or money: which would you rather waste?',
};

export const questions: Question[] = Array(20)
  .fill({})
  .map((_, questionId) => {
    const answers = Array(4)
      .fill({})
      .map((_, answerId) => ({
        answerId,
        description: `#${answerId}:${answer.description}`,
      })) as Question['answers'];

    return {
      questionId,
      answers,
      description: `#${questionId}:${question.description}`,
    };
  });
