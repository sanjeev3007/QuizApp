export type QuizDataType = {
  id: number;
  userid: string;
  topic: string;
  questions: {
    id: number;
    uuid: string;
    grade: string;
    topic: string;
    options: string;
    subject: string;
    metadata: {
      grade: string;
      topic: string;
      subject: string;
      subtopic: string;
      learning_objective: string;
    };
    question: string;
    created_at: string;
    explanation: string;
    modified_at: string;
    blooms_level: string;
    difficulty_level: string;
    difficulty_rating: number;
  }[];
  submissions: {
    selected: {
      text: string;
      correct: string;
    };
    isCorrect: false;
    questionId: string;
  }[];
  timestarted: Date;
  timeended: Date;
  created_at: Date;
  start: boolean;
  complete: boolean;
};
