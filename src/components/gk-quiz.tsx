"use client";

import { getGkQuestions } from "@/app/supabase-client-provider";

const GkQuiz = () => {
  //   const router = useRouter();
  const onSubmit = async () => {
    // try {
    //   if (!!inCompleteQuiz) {
    //     router.push(`/chat/${inCompleteQuiz.id}`);
    //     return;
    //   }

    const questions = await getGkQuestions();
    console.log(questions);

    //   const supabase = createClientComponentClient();
    //   const { data: assessment_data, error } = await supabase
    //     .from("quiz")
    //     .insert({
    //       //   userid: userId,
    //       topic: questions[0]?.topic,
    //       questions: questions,
    //       start: true,
    //     })
    //     .select();

    //   if (error) {
    //     console.error(error);
    //   }
    //   if (assessment_data && assessment_data.length > 0) {
    //     router.push(`/chat/${assessment_data[0].id}`);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   return;
    // } finally {
    //   setLoader(false);
    // }
  };

  return <button onClick={onSubmit}>GkQuiz</button>;
};

export default GkQuiz;
