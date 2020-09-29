import React from 'react'

export function Answer({ onlineId, currTimeStamp, chosenAnsIdx, correctAnsIdx, answer, idx, answerQuestion, wasQuestionAnswered }) {

    function playSound() {
        if (wasQuestionAnswered || !currTimeStamp) return
        const sound = new Audio(((idx === correctAnsIdx)) ?
            '../sounds/correct.wav' : '../sounds/wrong.mp3')
        sound.currentTime = 0;
        sound.play()
    }

    function setRightWrongColor() {
        if ((correctAnsIdx === idx) && (currTimeStamp === -1)) return { backgroundColor: 'green' }
        if ((idx === chosenAnsIdx) && (correctAnsIdx === chosenAnsIdx)) return { backgroundColor: 'green' }
        if ((chosenAnsIdx === 0 || chosenAnsIdx) && (correctAnsIdx === idx)) return { backgroundColor: 'green' }
        if ((idx === chosenAnsIdx) && (correctAnsIdx !== chosenAnsIdx)) return { backgroundColor: 'red' }
    }
    function determinHeightOnMobile(){
        if(window.innerWidth <= 720){
            if(!onlineId) return 'answers-mobile-singleplayer'
            else return 'answers-mobile-multiplayer'
        }  
        return ""
    }

    return (
        <div className={`answer answer-${idx} ${determinHeightOnMobile()} `}
            style={setRightWrongColor()}
            onClick={() => {
                answerQuestion(answer.isCorrect, idx)
                playSound()
            }}>
            <h3>{answer.txt}</h3>

        </div>
    )
}