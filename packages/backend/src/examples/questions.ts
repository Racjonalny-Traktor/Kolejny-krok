import { Answer } from 'src/models/answer';
import { Question } from 'src/models/question';

// const answer: Pick<Answer, 'description'> = {
//   description: 'I will never loose any money bro :)',
// };

// const question: Pick<Question, 'description'> = {
//   description: 'Love or money: which would you rather waste?',
// };

// export const questions: Question[] = Array(20)
//   .fill({})
//   .map((_, questionId) => {
//     const answers = Array(4)
//       .fill({})
//       .map((_, answerId) => ({
//         answerId,
//         description: `#${answerId}:${answer.description}`,
//       })) as Question['answers'];

//     return {
//       questionId,
//       answers,
//       description: `#${questionId}:${question.description}`,
//     };
//   });

const answers: Omit<Answer, 'questionId'>[] = [
  {
    answerId: 0,
    description: 'TAK',
  },
  {
    answerId: 1,
    description: 'RACZEJ TAK',
  },
  {
    answerId: 2,
    description: 'RACZEJ NIE',
  },
  {
    answerId: 3,
    description: 'NIE',
  },
];

export const questions: Question[] = [
  {
    questionId: 1,
    description: 'Czy lubisz zwierzęta?',
    answers,
  },
  {
    questionId: 2,
    description: 'Czy lubisz pomagać innym?',
    answers,
  },
  {
    questionId: 3,
    description: 'Czy lubisz pracę biurową?',
    answers,
  },
  {
    questionId: 4,
    description: 'Czy lubisz pracę fizyczną?',
    answers,
  },
  {
    questionId: 5,
    description: 'Czy lubisz biologię?',
    answers,
  },
  {
    questionId: 6,
    description: 'Czy lubisz fizykę?',
    answers,
  },
  {
    questionId: 7,
    description: 'Czy lubisz pracę z ludźmi?',
    answers,
  },
  {
    questionId: 8,
    description: 'Czy dobrze się czujesz pracując w stresie?',
    answers,
  },
  {
    questionId: 9,
    description: 'Czy interesujesz się danymi?',
    answers,
  },
  {
    questionId: 10,
    description: 'Czy interesujesz się naukami społecznymi?',
    answers,
  },
];
