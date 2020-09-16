import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { quizService } from '../services/quizService'
export class _QuizDetails extends Component {

    state = {
        quiz: null
    }


    componentDidMount() {
        const quiz = quizService.getById(this.props.match.params.quizId)
        this.setState({ quiz })
    }

    getBestUsers = () => {
        const { quiz } = this.state
        var best5Players = [...quiz.allTimesPlayers];
        best5Players.sort((player1, player2) => {
            return (player2.score - player1.score)
        }).slice(0, 5)
        return best5Players;
    }



    render() {
        const { quiz } = this.state
        if (!quiz) return <div>Loading...</div>
        const best5Players = this.getBestUsers();
        this.getBestUsers()

        return (
            <section className="quiz-details-container">
                {quiz.img && <img src={quiz.img} alt="" />}
                {!quiz.img && <img src="https://images.unsplash.com/photo-1539628399213-d6aa89c93074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />}
                <div className="rank-container">
                    <h3>
                        <p># | Name | Score</p>

                    </h3>
                    <div className="rank-table">
                        {best5Players.map((player, idx) => {
                            return <p key={player.id}>
                                <span className="table-position">{idx + 1} - </span>
                                <span className="table-name">{player.fullName}</span>
                                <span className="table-score"> Scored {player.score}</span>
                            </p>
                        })}

                    </div>

                </div>
                <h2 className="title">{quiz.title} <span>{quiz.quests.length} Questions</span></h2>
                <h5 className="creator">{quiz.createdBy.fullName}</h5>
                <div className="tags">
                    {quiz.tags.map((tag,idx) => {
                        return <span key={idx}>{tag} </span>
                    })}
                </div>
                <Link to={`/game/${quiz._id}`}><button>Single Player</button></Link>
                <button>Multi Player</button>
                <div className="review-stats">

                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const QuizDetails = connect(mapStateToProps, mapDispatchToProps)(_QuizDetails)