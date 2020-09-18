import React, { Component } from 'react'
import { Answer } from '../cmps/answer.jsx'
import { QuizList } from './QuizList.jsx'
import { quizService } from '../services/quizService'


export class BrowseTagPreview extends Component {

    state={
        quizzes:[]
    }

    componentDidMount() {
        this.getQuizzes();
    }

    async getQuizzes(){
        try{
            const quizzes= await quizService.getByTag(this.props.tag);
            console.log("BrowseTagPreview -> getQuizzes -> quizzes", this.props.tag,quizzes)
            this.setState({quizzes})
        }catch(err){
            console.log(err);
        }
    }
    

    render() {

        return (
            <div>
                <QuizList quizzes={this.state.quizzes} />
            </div>

        )
    }
}