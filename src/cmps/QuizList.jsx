import { Link } from '@material-ui/core'
import React from 'react'
import { QuizPreview } from './QuizPreview'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

export function QuizList({ quizzes,next,prev }) {
    return (
        <div className="quiz-list flex align-center justify-between">
            
            {prev && <ArrowLeftIcon onClick={() => prev()}/>}
            <div className="list">
            {
                
                quizzes.map(quiz =><QuizPreview key={ quiz._id } quiz={ quiz }  />)
            }
            </div>
            {next && <ArrowRightIcon onClick={() => next()}/>}
        </div>
    )
}
