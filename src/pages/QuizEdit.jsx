import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { QuestList } from '../cmps/QuestList'
import { quizService } from '../services/quizService'
import { cloudinaryService } from '../services/cloudinaryService'
import { utils } from '../services/utils'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';

export class _QuizEdit extends Component {

    state = {
        title: '',
        quests: [],
        style: 'solid',
        img: '',
        tags: '',
        difficulity: 1,
        questImg: '',
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
        var quest = {
            txt: this.state.currQuest,
            displayedCount: 0,
            style: this.state.style,
            img: this.state.questImg,
            answers: this.state.answers.reduce((acc, answer, idx) => {
                if (idx === 0) acc.push({ txt: answer.txt, isCorrect: 'true', count: 0 })
                else acc.push({ txt: answer.txt, isCorrect: 'false', count: 0 })
                return acc
            }, [])
        }
        var quests = [...this.state.quests]
        if (!this.state.id) {
            quest.id = utils.makeId();
            quests.push(quest);
        } else {
            quest.id = this.state.id
            const idx = quests.findIndex(quest => quest.id === this.state.id);
            quests[idx] = quest;
        }
        this.state.id = '';
        this.setState(prevState => ({
            quests: quests,
            answers: [
                { txt: "" },
                { txt: "" },
                { txt: "" },
                { txt: "" }
            ],
            currQuest: '',
            questImg: ''
        }));


    }

    onSubmit = async (event) => {
        const { title, tags, difficulity, quests, img } = this.state
        event.preventDefault()
        const quiz = {
            title,
            tags: tags.split(' '),
            difficulity,
            img,
            createdBy: {
                _id: utils.makeId(),
                fullName: "guest202",
                imgUrl: "http://some-img"
            },
            quests,
            reviews: [],
            allTimesPlayers: []
        }
        console.log(quiz);
        await quizService.add(quiz);
        this.props.history.push('/')
    }

    uploadImg = async (ev) => {
        const { name } = ev.target
        console.log("uploadImg -> name", name)
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            const img = newImg.secure_url;
            this.setState({ [name]: img })
        } catch (err) {
            console.log(err);
        }
    }

    onUpdateQuest = async (quest) => {
        console.log(quest);
        const { id, txt, style, img, answers } = quest
        console.log(answers);
        this.setState({ id, currQuest: txt, style, img, answers: [{ txt: answers[0].txt }, { txt: answers[1].txt }, { txt: answers[2].txt }, { txt: answers[3].txt }] })
    }


    onDeleteQuest = (questId) => {
        console.log();
        var quests = [...this.state.quests];
        console.log(quests);
        quests = quests.filter(quest => quest.id !== questId)
        this.setState({ quests })
    }




    render() {
        return (
            <div className="full quiz-edit">
                <div className='flex'>
                    <div className='quest-list-preview'>
                        <QuestList quests={this.state.quests} onUpdateQuest={this.onUpdateQuest} onDeleteQuest={this.onDeleteQuest} />
                    </div>
                    <div className='quest-layout'>

                        <label className="upload-btn" htmlFor="upload-file-quest">{!this.state.questImg && <img className="quest-img" src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600370634/ckkxyhlemtikzm8nmg0r.png" alt="" />}
                            {this.state.questImg && <img className="quest-img" src={this.state.questImg} alt="img" />}</label>
                        <input hidden type="file" className="file-input" name="questImg" id="upload-file-quest"
                            onChange={this.uploadImg} />
                        <form className='quest-answers' onSubmit={this.onSubmitAns}>

                            <TextField className='quest' label="Quest" variant="outlined" autoComplete="off" type="text" name='currQuest' onChange={this.handleChange} value={this.state.currQuest} />
                            <TextField label="Correct answer" variant="outlined" autoComplete="off" type="text" name='0' onChange={this.handleChangeAns} value={this.state.answers[0].txt} />
                            <TextField label="Wrong answer" variant="outlined" autoComplete="off" type="text" name='1' onChange={this.handleChangeAns} value={this.state.answers[1].txt} />
                            <TextField label="Wrong answer" variant="outlined" autoComplete="off" type="text" name='2' onChange={this.handleChangeAns} value={this.state.answers[2].txt} />
                            <TextField label="Wrong answer" variant="outlined" autoComplete="off" type="text" name='3' onChange={this.handleChangeAns} value={this.state.answers[3].txt} />
                            <div className='edit-btn flex align-center justify-center' onClick={this.onSubmitAns}>
                                {/* <EditIcon /> */}
                            <PlaylistAddIcon fontSize="large"/>

                            </div>
                        </form>
                    </div>
                </div>
                <div className='quiz-inputs'>

                    <form className='quiz-inputs-form' onSubmit={this.onSubmit}>
                    <TextField label="Title" variant="outlined" autoComplete="off" type="text" name='title' value={this.state.title} onChange={this.handleChange} />
                    <TextField label="Tags" variant="outlined" autoComplete="off" type="text" name='tags' value={this.state.tags} onChange={this.handleChange} />
                        <input type="range" name='difficulity' value={this.state.difficulity} min='1' max='3' onChange={this.handleChange} />
                    <label className="upload-btn" htmlFor="upload-file">{!this.state.img && <p>Choose file</p>}
                        {this.state.img && <img src={this.state.img} alt="img" />}</label>
                    <input hidden type="file" className="file-input" name="img" id="upload-file"
                        onChange={this.uploadImg} />
                        <PublishIcon  fontSize="large" onClick={this.onSubmit}/>
                    </form>



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
export const QuizEdit = connect(mapStateToProps, mapDispatchToProps)(_QuizEdit)