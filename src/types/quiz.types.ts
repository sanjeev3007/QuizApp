export type QuizDataType = {
  id: number;
  userid: string;
  topic_id: number;
  questions: {
    uuid: string;
    grade: string;
    topic: string;
    options: Option[];
    subject: string;
    metadata: {
      grade: string;
      topic: string;
      subject: string;
      subtopic: string;
      learning_objective: string;
    };
    question: string;
    explanation: string;
  }[];
  submissions: {
    selected: {
      text: string;
      correct: string;
    };
    isCorrect: false;
    questionId: string;
  }[];
  created_at: Date;
  start: boolean;
  complete: boolean;
};

type Option = {
  text: string;
  correct: string;
};

export type TopicTable = {
  id: number;
  topic_name: string;
  subject_id: string;
  grade: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};

export type SubjectTable = {
  id: number;
  subject_name: string;
  created_at: Date;
  updated_at: Date;
};

export type CorrectSubmissions = {
  id: string;
  user_id: string;
  question_id: string;
  quiz_id: number;
  topic_id: string;
  grade: number;
  created_at: Date;
};

export type TopicAssignedToQuiz = {
  id: number;
  quiz_id: string;
  topic_id: number;
  created_at: Date;
  updated_at: Date;
};
