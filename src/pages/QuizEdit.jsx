import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { QuestList } from '../cmps/QuestList'
import { quizService } from '../services/quizService'
import { userService } from '../services/userService'
import { cloudinaryService } from '../services/cloudinaryService'
import { utilService } from '../services/utilService'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import { setNotification } from '../store/actions/notificationActions.js'


export class _QuizEdit extends Component {

    state = {
        title: '',
        quests: [],
        style: 'solid',
        img: '',
        tags: '',
        reviews: [],
        allTimesPlayers: [],
        difficulity: 1,
        questImg: '',
        currQuest: '',
        answers: [
            { txt: "" },
            { txt: "" },
            { txt: "" },
            { txt: "" }
        ],
        difficulity: '1',
        firstPage: true
    }

    componentDidMount() {
        if (this.props.match.params.quizId) {
            this.setQuiz();
        }
    }

    async setQuiz() {
        try {
            const quiz = await quizService.getById(this.props.match.params.quizId)
            const { quests, title, img, tags, difficulity, _id, reviews, allTimesPlayers } = quiz
            this.setState({ quests, title, img, tags: tags.join(' '), difficulity, _id, reviews, allTimesPlayers })
        } catch (err) {
            console.log(err);
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
        var isDontHaveCurr = false
        var isOverLetters = false
        const MAX_LETTER = 50
        var quest = {
            txt: this.state.currQuest,
            displayedCount: 0,
            style: this.state.style,
            img: this.state.questImg,
            answers: this.state.answers.reduce((acc, answer, idx) => {
                if (idx === 0 && !answer.txt) {
                    isDontHaveCurr = true
                }
                if (answer.txt.length > MAX_LETTER) isOverLetters = true
                if (!answer.txt) return acc;
                if (idx === 0) acc.push({ txt: answer.txt, isCorrect: 'true', count: 0 })
                else acc.push({ txt: answer.txt, isCorrect: 'false', count: 0 })
                return acc
            }, [])
        }
        if (!quest.txt || isDontHaveCurr || isOverLetters || quest.answers.length == 3 || quest.answers.length === 1 || quest.answers.length === 0) {
            if (!quest.txt) this.props.setNotification('err', 'Please Enter Question.')
            if (isOverLetters) this.props.setNotification('err', `More than ${MAX_LETTER} letters on answers.`)
            if (isDontHaveCurr) this.props.setNotification('err', 'Correct Answer Input is Empty. ')
            if (quest.answers.length === 3 || quest.answers.length === 1 || quest.answers.length === 0) this.props.setNotification('err', 'You must  confirm two or four answers')
            return;
        }
        var quests = [...this.state.quests]
        if (!this.state.id) {
            quest.id = utilService.makeId();
            quests.push(quest);
            this.props.setNotification('info', `Question added! you have ${quests.length} Questions `)
        } else {
            quest.id = this.state.id
            const idx = quests.findIndex(quest => quest.id === this.state.id);
            quests[idx] = quest;
            this.props.setNotification('success', 'Question edited successfully ')
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
        const user = { ...this.props.loggedinUser }
        event.preventDefault()
        const { title, tags, difficulity, quests, img, reviews, allTimesPlayers, _id } = this.state
        if (!title || !tags || quests.length === 0) {
            if (!title) this.props.setNotification('err', `Please Enter Title!`)
            if (!tags) this.props.setNotification('err', `Please Enter Tags!`)
            if (quests.length === 0) this.props.setNotification('err', `Please Enter Questions!`)

            return;
        }
        const miniUser = (user.username) ? { _id: user._id, fullName: user.username, imgUrl: user.profileImg } : { _id: utilService.makeId(), fullName: utilService.getRandomGuest(), imgUrl: "" }
        const quiz = {
            _id,
            reviews,
            allTimesPlayers,
            title,
            tags: this.getTags(tags),
            difficulity: +difficulity,
            img: (img) ? img : 'https://res.cloudinary.com/dif8yy3on/image/upload/v1600338177/soxwdqgc9djvlrlclkmk.png',
            createdBy: miniUser,
            quests,
        }
        if (!this.state._id) {
            const newQuiz = await quizService.add(quiz);
            if (user._id) await userService.updateUserQuizzes(user, newQuiz._id)
            this.props.setNotification('success', `Quiz Added!`)
        } else {
            quiz._id = this.state._id;
            await quizService.update(quiz);
            this.props.setNotification('success', `Quiz Edited!`)
        }
        this.props.history.push('/')
    }

    getTags=(strTags)=>{
        var tags=strTags.split(' ');
        tags=tags.map(tag=>tag.charAt(0).toUpperCase() + tag.slice(1))
        return tags
    }

    uploadImg = async (ev) => {
        const { name } = ev.target
        try {
            const newImg = await cloudinaryService.uploadImg(ev);
            const img = newImg.secure_url;
            this.setState({ [name]: img })
        } catch (err) {
        }
    }

    onUpdateQuest = async (quest) => {
        const { id, txt, style, img, answers } = quest
        this.setState({ id, currQuest: txt, style, questImg: img, answers: [{ txt: answers[0].txt }, { txt: answers[1].txt }, { txt: answers[2].txt }, { txt: answers[3].txt }] })
    }


    onDeleteQuest = (questId) => {
        var quests = [...this.state.quests];
        quests = quests.filter(quest => quest.id !== questId)
        this.setState({ quests })
        this.props.setNotification('info', `Question Deleted!`)

    }

    setRandomQuiz = async () => {
        const quiz = await quizService.getRandomQuiz()
        const { quests, title } = quiz
        this.setState({ quests, title })
    }

    getDifficulty = () => {
        const { difficulity } = this.state
        if (difficulity === '1') return 'Easy'
        else if (difficulity === '2') return 'Medium'
        else if (difficulity === '3') return 'Hard'
    }

    render() {
        return (
            <div className="full quiz-edit">
                <div className='flex edit-layout'>
                    <div className='quest-list-preview'>
                        <h3>Quiz Questions</h3>
                        {this.state.quests.length === 0 && <h4 className='mt10'>No questions yet</h4>}
                        <QuestList quests={this.state.quests} onUpdateQuest={this.onUpdateQuest} onDeleteQuest={this.onDeleteQuest} />
                    </div>
                    <div className='quest-layout'>


                        {this.state.firstPage && <React.Fragment>
                            <h2 className='mt10'>Add Questions</h2>



                            <label className="upload-btn" htmlFor="upload-file-quest">{!this.state.questImg && <img className="quest-img" src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600370634/ckkxyhlemtikzm8nmg0r.png" alt="" />}
                                {this.state.questImg && <img className="quest-img" src={this.state.questImg} alt="img" />}</label>
                            <input hidden type="file" className="file-input" name="questImg" id="upload-file-quest"
                                onChange={this.uploadImg} />



                            <form className='quest-answers' onSubmit={this.onSubmitAns}>

                                <TextField label="Image URL" variant="outlined" autoComplete="off" type="text" name='questImg' onChange={this.handleChange} value={this.state.questImg} />
                                <TextField className='quest' label="Question" variant="outlined" autoComplete="off" type="text" name='currQuest' onChange={this.handleChange} value={this.state.currQuest} />
                                <TextField label="Correct Answer" variant="outlined" autoComplete="off" type="text" name='0' onChange={this.handleChangeAns} value={this.state.answers[0].txt} />
                                <TextField label="Wrong Answer" variant="outlined" autoComplete="off" type="text" name='1' onChange={this.handleChangeAns} value={this.state.answers[1].txt} />
                                <TextField label="Wrong Answer" variant="outlined" autoComplete="off" type="text" name='2' onChange={this.handleChangeAns} value={this.state.answers[2].txt} />
                                <TextField label="Wrong Answer" variant="outlined" autoComplete="off" type="text" name='3' onChange={this.handleChangeAns} value={this.state.answers[3].txt} />
                                <div  >
                                    <button onClick={this.onSubmitAns}>Save</button>
                                </div>
                                <div>
                                    <button className='swich-btn' onClick={() => { this.setState({ firstPage: !this.state.firstPage }) }}>Edit Quiz</button>
                                </div>
                            </form>
                        </React.Fragment>
                        }
                        {!this.state.firstPage &&
                            <div className='quiz-inputs'>
                                <h2 className='mt10'>Quiz Details</h2>
                                {/* <button onClick={this.setRandomQuiz}>Set Random Quiz</button> */}

                                <label className="upload-btn" htmlFor="upload-file">{!this.state.img && <img className="quest-img" src="https://res.cloudinary.com/dif8yy3on/image/upload/v1600370634/ckkxyhlemtikzm8nmg0r.png" alt="" />}
                                    {this.state.img && <img className="quiz-img" src={this.state.img} alt="img" />}</label>
                                <input hidden type="file" className="file-input" name="img" id="upload-file"
                                    onChange={this.uploadImg} />
                                <form className='quiz-inputs-form mt10' onSubmit={this.onSubmit}>
                                    <TextField label="Image URL" variant="outlined" autoComplete="off" type="text" name='img' onChange={this.handleChange} value={this.state.img} />
                                    <TextField label="Quiz Title" variant="outlined" autoComplete="off" type="text" name='title' value={this.state.title} onChange={this.handleChange} />
                                    <TextField label="Tags" variant="outlined" autoComplete="off" type="text" name='tags' value={this.state.tags} onChange={this.handleChange} />

                                    <div>
                                        <h3> Difficulity: </h3>
                                        <input type="range" name='difficulity' value={this.state.difficulity} min='1' max='3' onChange={this.handleChange} />
                                    </div><span>{this.getDifficulty()}</span>
                                    <button onClick={() => { this.setState({ firstPage: !this.state.firstPage }) }}>Edit Questions</button>
                                    <button onClick={this.onSubmit}>Publish</button>
                                </form>



                            </div>
                        }

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedinUser: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
    setNotification
}
export const QuizEdit = connect(mapStateToProps, mapDispatchToProps)(_QuizEdit)