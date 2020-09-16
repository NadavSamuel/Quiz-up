import React from 'react'
import { QuizPreview } from './QuizPreview'

export function QuizList({ quizzes,next,prev }) {
    return (
        <div className="quiz-list ">
            {next && <button onClick={() => next()}>next</button>}
            {prev && <button onClick={() => prev()}>prev</button>}
            <div className="list">
            {
                quizzes.map(quiz => <QuizPreview key={ quiz._id } quiz={ quiz }  />)
            }
            </div>
        </div>
    )
}
