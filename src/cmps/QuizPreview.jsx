import React from 'react'

export function QuizPreview({ quiz }) {
    console.log(quiz);
    function getRate(){
        const sum=quiz.reviews.reduce((acc,review)=>{
            return acc+review.rate
        },0)

        return (sum/quiz.reviews.length).toFixed(1);
    }


    return (
        <div className="quiz-preview">
          <img src={quiz.img} alt="img"/>
          <h3>{quiz.title}</h3>
          <p>{quiz.createdBy.fullName}</p>
          <p>{quiz.quests[0].displayedCount}</p>
          <p>{quiz.tags[0]}</p>
          <p>{getRate()}</p>
        </div>
    )
}
