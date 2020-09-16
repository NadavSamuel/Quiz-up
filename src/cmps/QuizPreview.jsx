import React from 'react'

export function QuizPreview({ quiz }) {
    function getRate(){
        const sum=quiz.reviews.reduce((acc,review)=>{
            return acc+review.rate
        },0)

        return (sum/quiz.reviews.length).toFixed(1);
    }

    function getstar(num){
        var arr = []
        var fiveMinusArr = []
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        for (let i = 0; i < 5 - num; i++) {
            fiveMinusArr.push(i)

        }
        return <div className='flex justify-around'>

            {arr.map((i, idx) =>
                <div key={idx}>
                    <i className="fas fa-star"></i>
                </div>
            )}
            {fiveMinusArr.map((i, idx) =>
                <div key={idx}>
                    <i className="far fa-star"></i>
                </div>
            )}
        </div>
    }


    return (
        <div className="quiz-preview">
          <img className="main-img" src={quiz.img} alt="img"/>
          <div className="info">
          <h3>{quiz.title}</h3>
          <p>
              <span>{quiz.createdBy.fullName}</span>
              <span className='num-of-players'> {quiz.quests[0].displayedCount}</span>
          </p>
          
          <p>{getRate()}</p>
          </div>
        </div>
    )
}
