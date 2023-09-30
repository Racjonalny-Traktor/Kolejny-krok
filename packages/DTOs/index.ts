
export interface GetAllQuestionsDTO {
    questions: Question[];
    size: number;
}

export interface AnswerDTO {
    questionId: string; // the same as param
    answerId: string;
}

export interface Question {
    questionId: number;
    description: string;
    answers: Answer[];
}

export interface Answer {
    answerId: string;
    description: string;
}

export type Endpoint = 'getAllQuestions' | 'postAnswer' | 'getResults';

export const ENDPOINTS: Record<Endpoint, string> = {
    getAllQuestions: '/v1/questions',
    postAnswer: '/v1/answer/:questionId',
    getResults: '/v1/results'
};