import React from 'react'
import { Answer } from '../cmps/Answer'
export function AnswersList({ onlineId, currTimeStamp,chosenAnsIdx, correctAnsIdx, answers, answerQuestion, wasQuestionAnswered, chosenAnswerIdx,determinIsMultiplayerClass }) {

    return (
        <div className="game-answers-container">
            <ul className="game-answers">
                {
                    answers.map((answer, idx) => <li key={idx}>
                        <Answer currTimeStamp={currTimeStamp }chosenAnsIdx={chosenAnsIdx} correctAnsIdx={correctAnsIdx} 
                        chosenAnswerIdx={chosenAnswerIdx} wasQuestionAnswered={wasQuestionAnswered} 
                        answerQuestion={answerQuestion} idx={idx} answer={answer} onlineId={onlineId} determinIsMultiplayerClass={determinIsMultiplayerClass} /></li>)
                }
            </ul>
        </div>

    )
}