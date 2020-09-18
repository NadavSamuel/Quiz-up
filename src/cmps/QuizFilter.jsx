import React, { Component } from 'react'


export class QuizFilter extends Component {
    state = {
        title: '',
    }
    

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value },()=>this.props.getFilterBy(this.state))
        
    }

    render() {
        return (
            <form className='quiz-filter'>
                <input name="title" autoComplete="off" value={ this.state.name } onChange={ this.handleChange } type="text"/>
            </form>
        )
    }
}
