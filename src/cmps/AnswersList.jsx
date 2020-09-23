import React from 'react'
import { Answer } from './Answer'

export function AnswersList({ chosenAnsIdx, correctAnsIdx,answers ,answerQuestion,answerFeedback,chosenAnswerIdx }) {
 
    return (
        <div className="game-answers-container">
            <ul className="game-answers">
            {
                answers.map((answer,idx) =><li key={ idx}><Answer  chosenAnsIdx={chosenAnsIdx} correctAnsIdx={correctAnsIdx} chosenAnswerIdx={chosenAnswerIdx} answerFeedback={answerFeedback} answerQuestion={answerQuestion} idx={idx} answer={ answer }  /></li>  )
            }
            </ul>
        </div>
        
    )
}