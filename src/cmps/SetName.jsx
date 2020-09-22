import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { utilService } from '../services/utilService'


export class _SetName extends Component {

    state = {
        fullName:''
    }

    componentDidMount() {
        }
    

 


    // handleChangeAns = ev => {
    //     var { name, value } = ev.target;

    //     this.setState( {
    //         ...this.state,name:value
    //     });
    // };

    handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? parseInt(target.value) : target.value
        this.setState({ [field]: value }, () => console.log(this.state))
    }
    // onSetUnregisteredUser = ()=>{
    //     this.props.getCurrUnregisteredUser(this.state.fullName)
    // }


    render() {
        // console.log(this.state);
        return (
           <div className="set-name-container">
               <form onSubmit={event => this.props.getCurrUnregisteredUser(event,this.state.fullName)}>
               <TextField className='set-name' label="What's your name?" variant="outlined" autoComplete="off" type="text" name='fullName' onChange={this.handleChange} value={this.state.fullName} />
               <button>Quiz-Up!</button>

               </form>
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
}
export const SetName = connect(mapStateToProps, mapDispatchToProps)(_SetName)