import React from 'react'

export function Answer({ chosenAnsIdx, correctAnsIdx, answer, idx, answerQuestion, answerFeedback, chosenAnswerIdx }) {
    // console.log("AnswerList -> answer", answer,idx)
    const answerColor = answer.isCorrect === 'true' ? 'green' : 'red'
    // function setRightWrongClass(chosenAnswerIdx){
    //     if(chosenAnswerIdx === idx) return 'correctAns'   
    //     else return ''  
    // }
    // console.log('correctAnsIdx: ',correctAnsIdx)
    // console.log('chosenAnsIdx in ans div',idx,chosenAnsIdx)
    // console.log('correctAnsIdx in ans div',idx,correctAnsIdx)
    function setRightWrongClass() {
        
        if(( idx === chosenAnsIdx) && (correctAnsIdx === chosenAnsIdx)) return { backgroundColor: 'green' }
        if((chosenAnsIdx === 0 ||chosenAnsIdx ) && (correctAnsIdx === idx)) return { backgroundColor: 'green' }
        if((idx === chosenAnsIdx) && (correctAnsIdx !== chosenAnsIdx)) return { backgroundColor: 'red' }
        // if((chosenAnsIdx && chosenAnsIdx !== idx ) && (correctAnsIdx !== idx)) return { opacity: 0 }
    }

        return (
            <div className={`answer answer-${idx} `}
                style={setRightWrongClass()}
                onClick={() => {
                    answerQuestion(answer.isCorrect, idx)
                }}>
                <h3>{answer.txt}</h3>

            </div>
        )
        // style={answerFeedback?{backgroundColor: answerColor}:{color: ''}}
    }