import React from 'react'
import Index from './_components/Index'

type Props = {}

const Page = (props: Props) => {
  return (
    <div className="p-5 md:px-12 w-full md:max-w-7xl mx-auto bg-[#FFF] !important">
        <Index/>
    </div>
  )
}

export default Page