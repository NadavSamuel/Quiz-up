import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { QuestList } from '../cmps/QuestList'
import { quizService } from '../services/quizService'
import { cloudinaryService } from '../services/cloudinaryService'
import { utils } from '../services/utils'
export class _QuizEdit extends Component {

    state = {
        title: '',
        quests: [],
        style: 'solid',
        img:'',
        tags: '',
        difficulity: 1,
        currQuest: '',
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

    onSubmitAns = (event) => {
        event.preventDefault()
        const quest = {
            id: utils.makeId(),
            txt: this.state.currQuest,
            displayedCount: 0,
            style: this.state.style,
            answers: this.state.answers.reduce((acc, answer, idx) => {
                if (idx === 0) acc.push({ txt: answer.txt, isCorrect: 'true', count: 0 })
                else acc.push({ txt: answer.txt, isCorrect: 'false', count: 0 })
                return acc
            }, [])
        }
        var quests = [...this.state.quests]
        quests.push(quest)
        this.setState(prevState => ({
            quests: quests,
            answers: [
                { txt: "" },
                { txt: "" },
                { txt: "" },
                { txt: "" }
            ],
            currQuest: ''
        }));

    }

    onSubmit = (event) => {
        const {title,tags,difficulity,quests,img}=this.state
        event.preventDefault()
        const quiz = {
            _id: utils.makeId(),
            title,
            tags:tags.split(' '),
            difficulity,
            img,
            createdBy: {
                _id: utils.makeId(),
                fullName: "guest202",
                imgUrl: "http://some-img"
            },
            quests,
            reviews:[]
        }
        console.log(quiz);
        quizService.add(quiz);
        this.props.history.push('/')

    }

    uploadImg = async (ev) => {
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            const img = newImg.secure_url;
            this.setState({ img })
        } catch (err) {
            console.log(err);
        }
    }

    onDeleteQuest= (questId)=>{
        var quests=[...this.state.quests];
        console.log(quests);
        quests=quests.filter(quest=>quest.id!==questId)
        this.setState({quests})
    }




    render() {
        // console.log(this.state.answers);
        return (
            <div className="quiz-edit">
                <QuestList quests={this.state.quests} onDeleteQuest={this.onDeleteQuest} />
                <form onSubmit={this.onSubmitAns}>
                    <input type="text" name='currQuest' placeholder='QUESTION' onChange={this.handleChange} value={this.state.currQuest} />
                    <input type="text" name='0' placeholder='COR ANSWER' onChange={this.handleChangeAns} value={this.state.answers[0].txt} />
                    <input type="text" name='1' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[1].txt} />
                    <input type="text" name='2' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[2].txt} />
                    <input type="text" name='3' placeholder='WRONG ANSWER' onChange={this.handleChangeAns} value={this.state.answers[3].txt} />
                    <button>edit</button>
                </form>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder='QUIZ TITLE' name='title' value={this.state.title} onChange={this.handleChange} />
                    <input type="text" placeholder='TAGS' name='tags' value={this.state.tags} onChange={this.handleChange} />
                    <input type="range" name='difficulity' value={this.state.difficulity} min='1' max='3' onChange={this.handleChange} />
                    <button>save</button>
                </form>

                <label className="upload-btn" htmlFor="upload-file">{!this.state.img && <p>Choose file</p>}
                {this.state.img && <img src={this.state.img} alt="img"/>}</label>
                    <input hidden type="file" className="file-input" name="imgUrl" id="upload-file"
                        onChange={this.uploadImg} />


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