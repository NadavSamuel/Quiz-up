import React, { Component } from 'react'
import { connect } from 'react-redux'
import { quizService } from '../services/quizService'
// import { BrowseTagPreview } from '../cmps/BrowseTagPreview'
import { Loading } from '../cmps/Loading'
import { TagPreview } from '../cmps/TagPreview'

class _Browse extends Component {

    state = {
        quizzes: [],
        tags: []
    }

    getTags = () => {
        const tags = this.state.quizzes.reduce((acc, quiz) => {
            let tags = quiz.tags
            console.log(tags);
            tags.forEach(tag => {
                if (!acc.includes(tag)) acc.push(tag)
            });
            return acc
        }, [])
        this.setState({ tags });
    }

    componentDidMount() {

        this.loadQuizzes();
    }

    loadQuizzes = async () => {
        const quizzes = await quizService.query();
        this.setState({ quizzes }, () => this.getTags())
    }

    getQuizzesByTag = async (tag) => {
        const quizzes = await quizService.getByTag(tag)
        return quizzes
    }

    render() {
        const quizzes = this.state.quizzes
        const tags = this.state.tags
        if (!quizzes) return <Loading />
        return (
            <div className="main-container">

                <div className="browse ">
                    {tags && tags.map((tag, idx) =>
                        <TagPreview tag={tag} key={idx} />

                    )}
                </div>
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
export const Browse = connect(mapStateToProps, mapDispatchToProps)(_Browse)