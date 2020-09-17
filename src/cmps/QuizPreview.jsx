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

        return (sum / quiz.reviews.length).toFixed(2);
    }

    function getNumOfReviews(){
        return quiz.reviews.length
    }

    

  


    return (
        <Link to={`/quiz/${quiz._id}`}>
            <div className="quiz-preview">
                <img className="main-img" src={quiz.img} alt="img" />
                <div className="info">
                    <h3>{quiz.title}</h3>
                    <p>
                        <span>{quiz.quests.length} Questions</span>
                        <span className='num-of-players'> {quiz.allTimesPlayers.length}</span>
                    </p>
                    <div className="flex stars">
                        ({getNumOfReviews()}){getRate()}<StarIcon/>
                    </div>
                </div>
            </div>
        </Link>
    )
}
