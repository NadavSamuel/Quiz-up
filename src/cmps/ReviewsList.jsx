import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
export function ReviewsList({ reviews }) {
    console.log('reviews:',reviews);
    if(!reviews.length) return (<div>No reviews for this quiz.</div>)
    function getRate(num) {
        var arr = []
        var fiveMinusArr = []
        for (let i = 0; i < num; i++) {
            arr.push(i);
        }
        for (let i = 0; i < 5 - num; i++) {
            fiveMinusArr.push(i)

        }
        return <div>

            {arr.map((i, idx) =>
                <span key={idx}>
                    <StarIcon />
                </span>
            )}
            {fiveMinusArr.map((i, idx) =>
                <span key={idx}>
                    <StarBorderIcon />
                </span>
            )}
        </div>
    }


    return (
        <div className="reviews-container">
            {reviews.map(review => {
                return <div className="review-card" key={review.id}>
                    <h3>By {review.by.fullName}</h3>
                    <p> {review.txt}</p>
                    {getRate(review.rate)}
                </div>
            })}
        </div>
    )
}
