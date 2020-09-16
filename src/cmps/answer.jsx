import React from 'react'

export function Answer({ answer,idx,answerQuestion,answerFeedback }) {
    console.log("AnswerList -> answer", answer,idx)
    const answerColor = answer.isCorrect === 'true'? 'green':'red'
    return (
        <div className={"answer-"+idx}>
            <h3 style={answerFeedback?{color: answerColor}:{color: ''}} onClick={() =>answerQuestion(answer.isCorrect)}>{answer.txt}</h3>

        </div>
    )
}