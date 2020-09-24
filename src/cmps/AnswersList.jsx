import React from 'react'
import { Answer } from './Answer'
// import {Answer} from './Answer'

export function AnswersList({  currTimeStamp,chosenAnsIdx, correctAnsIdx, answers, answerQuestion, wasQuestionAnswered, chosenAnswerIdx }) {

    return (
        <div className="game-answers-container">
            <ul className="game-answers">
                {
                    answers.map((answer, idx) => <li key={idx}>
                        <Answer currTimeStamp={currTimeStamp }chosenAnsIdx={chosenAnsIdx} correctAnsIdx={correctAnsIdx} 
                        chosenAnswerIdx={chosenAnswerIdx} wasQuestionAnswered={wasQuestionAnswered} 
                        answerQuestion={answerQuestion} idx={idx} answer={answer} /></li>)
                }
            </ul>
        </div>

    )
}