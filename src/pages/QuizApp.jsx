import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { Loading } from '../cmps/Loading'
import { imgService } from '../services/imgService'

class _QuizApp extends Component {

    state = {
        quizzes: [],
        tagCount: 0
    }

    componentDidMount() {
        this.loadQuizzes();

    }

    loadQuizzes = async () => {
        const quizzes = await quizService.query();
        this.setState({ quizzes })
    }

    getTags = (quizzes) => {
        const tags = quizzes.reduce((acc, quiz) => {
            let tags = quiz.tags
            tags.forEach(tag => {
                if (!acc.includes(tag)) acc.push(tag)
            });
            return acc
        }, [])
        return tags
    }

    async getImgUrl() {
        try {
            const imgs = await imgService.query();
            const idx = imgs.findIndex(img => img.name === this.props.tag)
            if (idx >= 0) {
                return imgs[idx].url
            } else {
                const data = await imgService.getNewImage(this.props.tag)
                const imgUrl = data.results[0].urls.raw
                imgService.add({ name: this.props.tag, url: imgUrl })
                return imgUrl
            }
        } catch (err) {
            console.log(err);
        }

    }

    render() {
        const quizzes = this.state.quizzes
        if (!quizzes) return <Loading />
        return (
            <div className="home-page main-container">
                <div className='title full'>
                    <div>
                        <h1>Play quizzes</h1>
                        <h1>Challenge your friends</h1>
                        <h1>Have fun</h1>
                    </div>
                </div>
                <h3 className='tag-title'>Most Popular</h3>
                <QuizList sort='popularity' quizzes={utilService.getMostPopular(quizzes).slice(0, 4)} />
                <h3 className='tag-title'>Top Rated</h3>
                <QuizList sort='rate' quizzes={utilService.getTopRated(quizzes).slice(0, 4)} />

            </div>
        )
    }

}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = {

}
export const QuizApp = connect(mapStateToProps, mapDispatchToProps)(_QuizApp)