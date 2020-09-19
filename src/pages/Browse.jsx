import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { QuizList } from '../cmps/QuizList'
import { quizService } from '../services/quizService'
import { BrowseTagPreview } from '../cmps/BrowseTagPreview'

class _Browse extends Component {

    state = {
        quizzes: [],
        tagCount: 0,
        tags:[]
    }

    getTags= ()=>{
        const tags = this.state.quizzes.reduce((acc,quiz)=>{
            let tags=quiz.tags
            tags.forEach(tag => {
                if( !acc.includes(tag))acc.push(tag)
            });
            return acc
        },[])
        this.setState({tags});
    }

    componentDidMount() {
       
        this.loadQuizzes();
    }

    loadQuizzes = async () => {
        const quizzes = await quizService.query();
        this.setState({ quizzes },()=>this.getTags())
    }

    getQuizzesByTag= async(tag)=>{
        const quizzes= await quizService.getByTag(tag)
        console.log(quizzes);
        return quizzes
    }

    render() {
        const quizzes = this.state.quizzes
        const tags=this.state.tags
        if (!quizzes) return <div>Loading....</div>
        return (
            <div className="full browse">
                {tags && tags.map((tag,idx)=><BrowseTagPreview key={idx} tag={tag}/>)}
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