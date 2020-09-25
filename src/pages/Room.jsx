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
        currUser: { username: '', score: 0 },
        isReady:false

    }

    componentDidMount() {
        const { gameSessionId, roomId } = this.props
        console.log('roomId:', roomId);
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
        var { players } = this.state
        this.setState({ players: [...players, player] })
    }

    //Outside the CMP
    newPlayer = () => {
        socketService.emit('game newPlayer', this.state.currUser);
    };

    startGame = () => {
        socketService.emit('start game', this.state.players)
    }

    // changeReady = () => {
    //     socketService.setup();
    //     socketService.emit('room quiz', this.state.onlineId);
    //     const { currUser, score,isReady} = this.state
    //     socketService.emit('change ready', { playerName: currUser, score, isReady:!isReady});
    // }

    // updateReady = ({playerName,score,isReady}) => {
    //     const newReady ={score,username:playerName.username,isReady};
    //     let onlinePlayers=[...this.state.onlinePlayers];
    //     const idx= onlinePlayers.findIndex(player=>player.username===newReady.username)
    //     if(idx===-1){
    //         console.log('cant find user');
    //         return;
    //     }
    //     onlinePlayers[idx]=newReady
    //     this.setState({onlinePlayers},()=>{console.log(this.state.onlinePlayers);})
    // }

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
                            {/* <button onClick={this.changeReady}>{(player.isReady)? 'ready':'Not Ready'}</button> */}
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