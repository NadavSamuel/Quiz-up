import React from 'react'
import { QuizPreview } from './QuizPreview'

export function QuizList({ quizzes }) {
    return (
        <div className="quiz-list">
            {
                quizzes.map(quiz => <QuizPreview key={ quiz._id } quiz={ quiz }  />)
            }
        </div>
    )
}
