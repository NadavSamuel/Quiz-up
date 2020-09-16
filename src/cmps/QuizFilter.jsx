export class _ToyFilter extends Component {
    state = {
        name: '',
        min: '',
        max: ''
    }
    

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState({ [field]: value }, () => this.props.setFilterBy({...this.state}))
    }

    render() {
        return (
            <form className='toy-filter'>
                <TextField id="outlined-basic" label="name" variant="outlined" name="name" autoComplete="off" value={ this.state.name } onChange={ this.handleChange } type="text" />
                <TextField id="outlined-basic" label="Min price" min="0" variant="outlined" type="number" name="min" onChange={ this.handleChange } />
                <TextField id="outlined-basic" label="Max price" min="0" variant="outlined" type="number" name="max" onChange={ this.handleChange } />
            </form>
        )
    }
}
