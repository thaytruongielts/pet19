export interface Question {
  id: number;
  prefix: string;
  suffix: string;
  answer: string;
}

export interface QuizState {
  answers: Record<number, string>;
  isSubmitted: boolean;
}