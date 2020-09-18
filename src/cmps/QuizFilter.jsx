import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';



export class QuizFilter extends Component {
    state = {
        title: '',
    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => this.props.getFilterBy(this.state))

    }

    render() {
        return (
            <form className='quiz-filter mt10'>
                <TextField label="Name" variant="outlined" autoComplete="off" name="title" autoComplete="off" value={this.state.name} onChange={this.handleChange} type="text" />

                {/* <input name="title" autoComplete="off" value={this.state.name} onChange={this.handleChange} type="text" /> */}
            </form>
        )
    }
}
