import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Button } from '@material-ui/core'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import React, { Component } from 'react';

export class ReviewsList extends Component {
    state = {
        allReviewsShown: false
    }
    getRate = (num) => {
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
    showMore = () => {
        this.setState({ allReviewsShown: !this.state.allReviewsShown })
    }

    render() {
        const { reviews } = this.props
        if (!reviews.length) return (<div>No reviews for this quiz.</div>)

        return (
            <div className="reviews-container">
                {reviews.map((review, idx) => {
                    if (!this.state.allReviewsShown && idx >= 3) return;
                    return <div className="review-card" key={review.id}>
                        <h3>By {review.by.fullName}</h3>
                        <p> {review.txt}</p>
                        {this.getRate(review.rate)}
                    </div>
                })}
                {reviews.length > 3 && <div className="read-more-btn">
                    <Button onClick={this.showMore} variant="outlined" color="primary">
                        {this.state.allReviewsShown ? 'Read Less' : 'Read More'}
                        <UnfoldMoreIcon />
                    </Button>
                </div>}
            </div>
        );
    }
}


