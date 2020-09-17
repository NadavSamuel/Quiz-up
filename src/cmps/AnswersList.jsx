import React from 'react'
import {Answer} from '../cmps/answer.jsx'

export function AnswersList({ answers ,answerQuestion,answerFeedback }) {
    // console.log("QuizGame -> answers", answers)
 
    return (
        <div className="game-answers-container">
            <ul className="game-answers">
            {
                answers.map((answer,idx) =><li key={ idx}><Answer  answerFeedback={answerFeedback} answerQuestion={answerQuestion} idx={idx} answer={ answer }  /></li>  )
            }
            </ul>
        </div>
        
    )
}