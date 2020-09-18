import React, { Component } from 'react'
import { Answer } from '../cmps/answer.jsx'
import { QuizList } from './QuizList.jsx'
import { quizService } from '../services/quizService'
import { Link } from 'react-router-dom'


export class BrowseTagPreview extends Component {

    state = {
        quizzes: []
    }

    componentDidMount() {
        this.getQuizzes();
    }

    async getQuizzes() {
        try {
            const quizzes = await quizService.getByTag(this.props.tag);
            console.log("BrowseTagPreview -> getQuizzes -> quizzes", this.props.tag, quizzes)
            this.setState({ quizzes })
        } catch (err) {
            console.log(err);
        }
    }


    render() {

        return (
            <div className='flex browse-tag'>
                <div className='tag-img' style={{backgroundImage: "url(https://res.cloudinary.com/dif8yy3on/image/upload/v1600149338/vytr7u9zzbfel5h70d6n.jpg)"}}>
                <Link to={`/${this.props.tag}`}>
                    <div className='style-tag-img '>
                    <h2>{this.props.tag}</h2>
                    </div>
                </Link>
                </div>
                <QuizList quizzes={this.state.quizzes} />
            </div>

        )
    }
}