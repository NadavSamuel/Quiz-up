import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService.js'

export class _Room extends Component {

    state = {
        players: [],
        currUser: { username: '', score: 0 }

    }

    componentDidMount() {
        const { gameSessionId, roomId } = this.props
        console.log('roomid:',roomId);
        // const gameSessionId = this.props.match.params.gameSessionId
        socketService.setup();
        socketService.emit('room quiz', roomId);
        this.setUser()
        //IMPOVE:
        socketService.on('game addPlayer', this.addPlayer)
        socketService.on('getPlayers', this.getPlayers)
        // socketService.on('user typing', this.setUserTyping)
        // socketService.on('game started', this.gameOn)

    }

    setUser = async () => {
        const { currUser } = this.props
        // if (loggedInUser) await this.setState({ currUser: { ...this.state.currUser, name: loggedInUser.username } })
        await this.setState({ currUser: { ...this.state.currUser, username: currUser.username } })
        socketService.emit('game newPlayer', this.state.currUser);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.terminate();
    }

    getPlayers = (players) => {
        if(!players) return;
        this.setState({ players }, () => console.log('Players on this room: ', players))
    }
    addPlayer = (player) => {
        console.log('got player:@@@@@',player);
        var { players } = this.state
        console.log(players,'THIS IS PLAYERS');
        this.setState({ players: [...players, player] })
    }

    //Outside the CMP
    newPlayer = () => {
        console.log('trying to add new player:', this.state.currUser);
        socketService.emit('game newPlayer', this.state.currUser);
    };

    startGame = () => {
        socketService.emit('start game', this.state.players)
    }

    render() {
        const { players, currUser } = this.state
        console.log(players, 'players')
        if (!players) return <div>No Players</div>
        return (
            <div>
                <button onClick={this.newPlayer}></button>
                <div className="players-list-container">
                    <ul className="players-list">
                        {players.map((player, idx) => {
                            if (!player.username) return
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

// Details > Play Online = Room -> Start Game -> Game - EndGame with scores