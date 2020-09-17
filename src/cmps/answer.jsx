import React from 'react'

export function Answer({ answer,idx,answerQuestion,answerFeedback }) {
    // console.log("AnswerList -> answer", answer,idx)
    const answerColor = answer.isCorrect === 'true'? 'green':'red'
    return (
        <div className={"answer answer-"+idx} style={answerFeedback?{backgroundColor: answerColor}:{color: ''}}  onClick={() =>answerQuestion(answer.isCorrect)}>
            <h3>{answer.txt}</h3>

        </div>
    )
}