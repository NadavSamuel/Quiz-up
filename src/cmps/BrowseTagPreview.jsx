import React, { Component } from 'react'
import { QuizList } from './QuizList.jsx'
import { quizService } from '../services/quizService'
import { imgService } from '../services/imgService'
import { Link } from 'react-router-dom'


export class BrowseTagPreview extends Component {

    state = {
        quizzes: [],
        imgUrl: ''
    }

    componentDidMount() {
        this.getImgUrl();
        this.getQuizzes();
    }

    async getImgUrl() {
        try {
            const imgs = await imgService.query();
            const idx = imgs.findIndex(img => img.name === this.props.tag)
            if (idx >= 0) {
                this.setState({ imgUrl: imgs[idx].url })
            } else {
                const data = await imgService.getNewImage(this.props.tag)
                const imgUrl = data.results[0].urls.raw
                imgService.add({ name: this.props.tag, url: imgUrl })
                this.setState({ imgUrl })
            }
        } catch (err) {
            console.log(err);
        }

    }

    async getQuizzes() {
        try {
            const quizzes = await quizService.getByTag(this.props.tag);
            this.setState({ quizzes })
        } catch (err) {
            console.log(err);
        }
    }




    render() {

        return (
            <div className='flex browse-tag '>
                <div className='tag-img' style={{ backgroundImage: `url(${this.state.imgUrl})`, backgroundSize: 'cover' }}>
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