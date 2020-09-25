import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService.js'

export default class _Room extends Component {

    state = {
        players: [],
        currUser: { name: '', score: 0 }

    }

    componentDidMount() {
        const { gameSessionId } = this.props
        // const gameSessionId = this.props.match.params.gameSessionId
        socketService.setup();
        socketService.emit('room quiz', gameSessionId);
        this.setUser()
        //IMPOVE:
        socketService.on('getPlayers', this.getPlayers)
        socketService.on('game addPlayer', this.addPlayer)
        // socketService.on('user typing', this.setUserTyping)
        // socketService.on('game started', this.gameOn)
        console.log('props:',this.props)
        console.log('state:',this.state)
    }

    setUser = () => {
        const {currUser} = this.props
        this.setState({currUser})
        // const { loggedInUser, currUser } = this.props
        // if (loggedInUser) await this.setState({ currUser: { ...this.state.currUser, name: loggedInUser.username } })
        // else await this.setState({ currUser: { ...this.state.currUser, name: currUser } })
        // socketService.emit('game newPlayer', this.state.currUser);
    }

    // gameOn = (players) => {
    //     this.props.history.push('/')
    // }


    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    getPlayers = (players) => {
        this.setState({ players }, () => console.log('Players on this room: ', players))
    }
    addPlayer = (player) => {
        const { players } = this.state
        this.setState({ players: [...players, player] })
    }

    //Outside the CMP
    newPlayer = () => {
        // ev.preventDefault();
        console.log('trying to add new player:', this.state.currUser);
        socketService.emit('game newPlayer', this.state.currUser);
        // this.setState({ msg: { from: 'Me', txt: '' } });
    };

    startGame = () => {
        socketService.emit('start game', this.state.players)
    }

    render() {
        const { players,currUser } = this.state
        console.log(players,'players')
        if (!players) return <div>No Players</div>
        return (
            <div>
                <button onClick={this.newPlayer}></button>
                <div className="players-list-container">
                    <ul className="players-list">    
        <li className="currUser">{currUser.username}</li>
                     {players.map((player, idx) => {
                    if(!player.username) return
                    return <li key={idx}>{player.username}</li>
                })}

                    </ul>
                </div>

                <button onClick={this.startGame}>Start Game</button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedinUser
    }
}

export const Room = connect(mapStateToProps)(_Room)


// Details > Play Online = Room