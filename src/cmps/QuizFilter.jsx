export class _QuizFilter extends Component {
    state = {
        name: '',
    }
    

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => this.props.setFilterBy({...this.state}))
    }

    render() {
        return (
            <form className='quiz-filter'>
                <input name="name" autoComplete="off" value={ this.state.name } onChange={ this.handleChange } type="text"/>
            </form>
        )
    }
}
