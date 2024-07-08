type Props = {
  userId: string;
  userName: string;
  grade: number;
  gkQuiz: {
    accuracy: number;
    totalQuiz: number;
  };
  totalChats: number;
};

const Quizes = async ({
  userId,
  userName,
  grade,
  gkQuiz,
  totalChats,
}: Props) => {
  return <div className=""></div>;
};

export default Quizes;
