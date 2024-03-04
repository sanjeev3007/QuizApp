import React from 'react'
import LevelCard from './level-card'
import ScoreGraph from './score-graph'

type Props = {}

const YourScore = (props: Props) => {
  return (
   <>
   <div className='text-[#2F4F4F] text-lg font-bold'>Your Score</div>
    <div className='flex justify-between'>
        <ScoreGraph/>
        <LevelCard/>
    </div>
   </>
  )
}

export default YourScore