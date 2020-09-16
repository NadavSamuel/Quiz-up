import React from 'react'

export function QuizPreview({ quiz }) {
    return (
        <div className="quiz-preview">
          <img src={quiz.imgUrl} alt="img"/>
          <h3>{quiz.title}</h3>
          <p>{quiz.createBy}</p>
          <p>{quiz.playsCount}</p>
          <p>{quiz.tags[0]}</p>
          <p>{quiz.rate}</p>
        </div>
    )
}
