import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from 'react-router-dom'
// import StarOutlineIcon from '@material-ui/icons/StarOutline';

export function QuizPreview({ quiz }) {
    function getRate() {
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)

        return (sum / quiz.reviews.length).toFixed(1);
    }

    function getRate() {
        const sum = quiz.reviews.reduce((acc, review) => {
            return acc + review.rate
        }, 0)

        return getStar(sum / quiz.reviews.length)
    }

    function getStar(num) {
        var arr = []
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        return <div className='flex stars'>

            {arr.map((i, idx) =>
                <div key={idx}>
                    <StarIcon />
                </div>
            )}
        </div>
    }


    return (
        <Link to={`/quiz/${quiz._id}`}>
            <div className="quiz-preview">
                <img className="main-img" src={quiz.img} alt="img" />
                <div className="info">
                    <h3>{quiz.title}</h3>
                    <p>
                        <span>{quiz.createdBy.fullName}</span>
                        <span className='num-of-players'> {quiz.quests[0].displayedCount}</span>
                    </p>

                    {getRate()}
                </div>
            </div>
        </Link>
    )
}
