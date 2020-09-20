import React from 'react'

export function Answer({ chosenAnsIdx, correctAnsIdx, answer, idx, answerQuestion, answerFeedback, chosenAnswerIdx }) {
    
    
    
    function setRightWrongColor() {
        
        if(( idx === chosenAnsIdx) && (correctAnsIdx === chosenAnsIdx)) return { backgroundColor: 'green' }
        if((chosenAnsIdx === 0 ||chosenAnsIdx ) && (correctAnsIdx === idx)) return { backgroundColor: 'green' }
        if((idx === chosenAnsIdx) && (correctAnsIdx !== chosenAnsIdx)) return { backgroundColor: 'red' }
        // if((chosenAnsIdx && chosenAnsIdx !== idx ) && (correctAnsIdx !== idx)) return { opacity: 0 }
    }

        return (
            <div className={`answer answer-${idx} `}
                style={setRightWrongColor()}
                onClick={() => {
                    answerQuestion(answer.isCorrect, idx)
                }}>
                <h3>{answer.txt}</h3>

            </div>
        )
        // style={answerFeedback?{backgroundColor: answerColor}:{color: ''}}
    }