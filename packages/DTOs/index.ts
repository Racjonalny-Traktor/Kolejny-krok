
// Returned from GET endpoint per each question
export interface QuestionDTO extends Question {
    answers: Answer[]; 
}

// Payload for each POST endpoint per each question
export interface AnswerDTO {
    answerId: string;
}

export interface Question {
    questionId: number;
    description: string;
}

export interface Answer {
    answerId: string;
    description: string;
}

export type Endpoint = 'getQuestion' | 'postAnswer' | 'getResults';

export const ENDPOINTS: Record<Endpoint, string> = {
    getQuestion: '/v1/question/:questionId',
    postAnswer: '/v1/answer/:answerId',
    getResults: '/v1/results'
}