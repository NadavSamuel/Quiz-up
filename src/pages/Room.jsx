import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService.js'
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {
    FacebookShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton
} from "react-share";

export class _Room extends Component {

    state = {
        players: [],
        currUser: { username: '', score: 0 }

    }

    componentDidMount() {
        const { gameSessionId, roomId } = this.props
        console.log('roomid:', roomId);
        // const gameSessionId = this.props.match.params.gameSessionId
        socketService.setup();
        socketService.emit('room quiz', roomId);
        socketService.on('game started', this.props.startGame);
        this.setUser()
        this.addNewUser();

    }

    addNewUser = async () => {
        await socketService.on('game addPlayer', this.addPlayer);
        await socketService.on('getPlayers', this.getPlayers);
    }

    setUser = async () => {
        const { currUser } = this.props
        // if (loggedInUser) await this.setState({ currUser: { ...this.state.currUser, name: loggedInUser.username } })
        await this.setState({ currUser: { ...this.state.currUser, username: currUser.username } })
        socketService.emit('game newPlayer', this.state.currUser);
    }

    componentWillUnmount() {
        socketService.off('chat addMsg', this.addMsg);
        socketService.off('game addPlayer', this.addPlayer);
        socketService.off('getPlayers', this.getPlayers);
        socketService.off('game started', this.props.startGame);
        // socketService.emit('user leave', roomId);

        socketService.terminate();
    }

    getPlayers = (players) => {
        if (!players) return;
        this.setState({ players }, () => console.log('Players on this room: ', players))
    }
    addPlayer = (player) => {
        console.log('got player:@@@@@', player);
        var { players } = this.state
        console.log(players, 'THIS IS PLAYERS');
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
            <div className='room'>
                <div className="players-list-container">
                    <h2>users:</h2>
                    <ul className="players-list">
                        {players.map((player, idx) => {
                            if (!player.username) return
                            return <li key={idx}><h2>{player.username}</h2>
                            {/* <button>{getIsReady}</button> */}
                            </li>
                        })}

                    </ul>
                </div>
                <FacebookShareButton url={window.location}>
                    <FacebookIcon />
                </FacebookShareButton>
                <WhatsappShareButton url={window.location}>
                    <WhatsAppIcon />
                </WhatsappShareButton>

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