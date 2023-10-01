export interface GetAllQuestionsDTO {
    questions: Question[];
    size: number;
}

export interface SubmitAnswerDTO {
    questionId: string;
    answerId: string;
}



export interface Answer {
    answerId: string;
    description: string;
}


export interface Question {
    questionId: number;
    description: string;
    answers: Answer[];
} 


export type Endpoint = 'getAllQuestions' | 'postAnswers' | 'getResults';

export const ENDPOINTS: Record<Endpoint, string> = {
    getAllQuestions: '/v1/quiz/questions',
    postAnswers: '/v1/quiz/answers',
    getResults: '/v1/quiz/results'
};