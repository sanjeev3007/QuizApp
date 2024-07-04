import React from 'react'
import "@/components/home-page.css";
import Image from 'next/image';
import NoahImage from "@/assets/Images/noah_doubt_solve_dp.svg"
import { Button, Card, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';

const NoahHeader = () => {
  return (
    <div className='noah-heading-wrapper'>
        <div className='noah-image-fact-wrap' style={{display:"flex", justifyContent: "space-around", gap: "30px"}}>
        <div className='noah-image-txtContainer'>
        <Image
            src={NoahImage}
            alt='Noah image'
            width={110}
            height={128}
         />
        <Typography className='noah-image-txt'>Noah says</Typography>
        </div>
        <div className='fact-card-container'>
            <Card className='fact-card'>
                <Typography className='fact-card-txt'>The old rocking chair creaked a comforting rhythm as Grandma flipped through a dusty photo album. Laughter lines crinkled around her eyes as she pointed to a faded picture. "Look at you there, covered in mud from head to toe! Building that fort in the backyard, you were such a rascal." A warm breeze rustled the curtains, carrying the scent of freshly baked cookies. I snuggled closer, eager to hear more stories of her childhood adventures.</Typography>
            </Card>
            <Button variant='text' className='insights-btn' endIcon={<ArrowOutwardRoundedIcon/>}>View detailed insights</Button>
        </div>
        </div>
        <div className='noah-subject-wrap'>
            <Card className='noah-subject-quiz'>
                <Typography className='noah-subject-text'>Noah creates quizzes to help you practice daily</Typography>
                <Button variant='contained' className='resume-quizz-btn' endIcon={<EastRoundedIcon/>}>Continue Quiz</Button>
            </Card>
        </div>
    </div>
  )
}

export default NoahHeader;