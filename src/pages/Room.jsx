import React, { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socketService.js'
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { Loading } from '../cmps/Loading';
import { setNotification } from '../store/actions/notificationActions';
import {
    FacebookShareButton,
    WhatsappShareButton,
    FacebookMessengerShareButton
} from "react-share";
import { CopyToClipboard } from '../cmps/CopyToClipboard.jsx';

export class _Room extends Component {

    state = {
        players: [],
        currUser: { username: '', score: 0, isReady: false },


    }

    componentDidMount() {
        const { roomId, startGame } = this.props
        socketService.setup();
        socketService.emit('room quiz', roomId);
        socketService.on('game started', startGame);
        socketService.on('update ready', this.updateReady);
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
        this.setState({ players }, () => { console.log(this.state.players) })
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
        console.log(this.props);
        if (this.state.players.findIndex(player => player.isReady) === -1) {
            this.props.setNotification('err', 'All players must be ready')
            return;
        }
        socketService.emit('start game', this.state.players)
    }

    changeReady = () => {
        socketService.setup();
        socketService.emit('room quiz', this.props.roomId);
        const { currUser } = this.state
        this.setState({ currUser: { ...currUser, isReady: !currUser.isReady } }, () => {
            socketService.emit('change ready', { playerName: currUser.username, isReady: !currUser.isReady });
        })
    }

    updateReady = ({ playerName, isReady }) => {
        console.log("updateReady -> playerName, isReady", playerName, isReady)
        console.log(this.state.players);
        let players = [...this.state.players];
        players = players.map(player => {
            if (player.username === playerName) return { ...player, isReady }
            return player
        })
        console.log("updateReady -> players", players)

        this.getPlayers(players)
    }

    render() {
        const { players, currUser } = this.state
        if (!players) return <Loading/>
        return (
            <div className='room full'>
                <div className='main-container'>

                    <div className="players-list-container">
                        <h2>Waitting Room</h2>
                        <ul className="players-list">
                            {players.map((player, idx) => {
                                if (!player.username) return;
                                return <li key={idx}>
                                    <h2 className='name'>{player.username}</h2>
                                    <h2 className='ready'>{(player.isReady) ? 'Ready' : 'Not Ready'}</h2>

                                </li>
                            })}

                        </ul>
                    </div>
                    <div className='game-controler'>
                        <button onClick={this.startGame}>Start Game</button>
                        <button onClick={this.changeReady}>{(!currUser.isReady) ? 'Ready' : 'Not Ready'}</button>
                    </div>
                    <div className='share-btn'>
                        <CopyToClipboard />
                        <div>

                            <FacebookShareButton url={window.location}>
                                <FacebookIcon />
                            </FacebookShareButton>
                            <WhatsappShareButton url={window.location}>
                                <WhatsAppIcon />
                            </WhatsappShareButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedinUser
    }
}
const mapDispatchToProps = {
    setNotification

}

export const Room = connect(mapStateToProps, mapDispatchToProps)(_Room)

// Details > Play Online = Room -> Start Game -> Game - EndGame with scores