import QuizScore from '@/components/quiz-score'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="p-5 md:p-12 w-full md:max-w-5xl mx-auto bg-[#FFF] !important">
      <QuizScore/>
    </div>
  )
}

export default Page