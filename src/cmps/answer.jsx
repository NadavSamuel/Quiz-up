import React from 'react'

export function Answer({ chosenAnsIdx, correctAnsIdx, answer, idx, answerQuestion ,answerFeedback }) {
    
    function playSound(){
        if(answerFeedback) return
        const sound =  new Audio((( idx === correctAnsIdx))?
        '../sounds/correct.wav':'../sounds/wrong.mp3')
        sound.currentTime = 0;
        sound.play()
    }

    function setRightWrongColor() {
        if(( idx === chosenAnsIdx) && (correctAnsIdx === chosenAnsIdx)) return { backgroundColor: 'green' }
        if((chosenAnsIdx === 0 ||chosenAnsIdx ) && (correctAnsIdx === idx)) return { backgroundColor: 'green' }
        if((idx === chosenAnsIdx) && (correctAnsIdx !== chosenAnsIdx)) return { backgroundColor: 'red' }
    }

        return (
            <div className={`answer answer-${idx} `}
                style={setRightWrongColor()}
                onClick={() => {
                    answerQuestion(answer.isCorrect, idx)
                    playSound()
                }}>
                <h3>{answer.txt}</h3>

            </div>
        )
    }