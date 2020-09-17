import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { QuestList } from '../cmps/QuestList'
import { quizService } from '../services/quizService'
import { utils } from '../services/utils'
export class _QuizEdit extends Component {

    state = {
        quiz: null,
        quests: [],
        style:'solid',
        currQuest:'',
        answers: [
            { txt: "" },
            { txt: "" },
            { txt: "" },
            { txt: "" }
        ]

    }

    componentDidMount() {
        if (this.props.match.params.quizId) {
            const quiz = quizService.getById(this.props.match.params.quizId)
            this.setState({ quiz })
        }
    }


    handleChangeAns = ev => {
        var { name, value } = ev.target;

        name = +name
        console.log("name, value ", name, value)
        this.setState(prevState => ({
            answers: prevState.answers.map((answer, idx) => {
                if (idx === name) answer.txt = value
                return { ...answer, txt: answer.txt }
            })


        }));
    };

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState({ [field]: value })
    }

    onSubmit = (event) => {
        event.preventDefault()
        const quest = {
            id:utils.makeId(),
            txt:this.state.currQuest,
            displayCount:0,
            style:this.state.style,
            answers: this.state.answers.reduce((acc,answer,idx)=>{
                if(idx===0) acc.push({txt:answer.txt, isCorrect:'true',count:0})
                else acc.push({txt:answer.txt, isCorrect:'false',count:0})
                return acc
            },[])
        }
        console.log("onSubmit -> quest", quest)
        var quests=[...this.state.quests]
        quests.push(quest)
        console.log("onSubmit -> quests", quests)
        this.setState(prevState => ({
            quests:quests
        }));
       
    }

    








    render() {
        // console.log(this.state.answers);
        return (
            <div className="quiz-edit">
                    <QuestList quests={this.state.quests}/>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name='currQuest' placeholder='QUESTION' onChange={this.handleChange} value={this.state.currQuest} />
                    <input type="text" name='0' placeholder='COR ANSWER' onChange={this.handleChangeAns} value={this.state.answers[0].txt} />
                    <input type="text" name='1' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[1].txt} />
                    <input type="text" name='2' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[2].txt} />
                    <input type="text" name='3' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[3].txt} />
                    <button>save</button>
                </form>
                

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
export const QuizEdit = connect(mapStateToProps, mapDispatchToProps)(_QuizEdit)