import React from 'react'
import { QuizPreview } from './QuizPreview'

export function QuizList({ quizzes }) {
    console.log("QuizList -> quizzes", quizzes)
    return (
        <div className="quiz-list">
            {
                quizzes.map(quiz => <QuizPreview key={ quiz._id } quiz={ quiz }  />)
            }
        </div>
    )
}
