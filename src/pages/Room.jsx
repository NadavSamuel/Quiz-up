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
        isAdmin:false
    }

    componentDidMount() {
        const { roomId, startGame } = this.props
        socketService.setup();
        socketService.emit('sign game', roomId);
        socketService.on('game started', startGame);
        socketService.on('update ready', this.updateReady);
        socketService.on('update players', this.updatePlayers);
        this.setUser()
        this.addNewUser();

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.players[0]) console.log(this.state.currUser.username===this.state.players[0].username,)
        if(this.state.players[0] && this.state.currUser.username===this.state.players[0].username && !this.state.isAdmin) this.setState({isAdmin:true})
    }
    

    updatePlayers = (username) => {
        var newPlayers = [...this.state.players]
        newPlayers = newPlayers.filter(player => player.username !== username)
        this.setState({ players: newPlayers });
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
        socketService.setup();
        socketService.emit('sign game', this.props.roomId);
        socketService.emit('game removePlayer', this.state.currUser.username);
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
        if (this.state.players.findIndex(player => !player.isReady) !== -1) {
            this.props.setNotification('err', 'All players must be ready')
            return;
        }
        socketService.emit('start game', this.state.players)
    }

    changeReady = () => {
        socketService.setup();
        socketService.emit('sign game', this.props.roomId);
        const { currUser } = this.state
        this.setState({ currUser: { ...currUser, isReady: !currUser.isReady } }, () => {
            socketService.emit('toggle ready', { playerName: currUser.username, isReady: !currUser.isReady });
        })
    }

    updateReady = ({ playerName, isReady }) => {
        let players = [...this.state.players];
        players = players.map(player => {
            if (player.username === playerName) return { ...player, isReady }
            return player
        })
        this.getPlayers(players)
    }

    render() {
        const { players, currUser,isAdmin } = this.state
        if (!players) return <Loading />
        return (
            <div className='room full'>
                <div className='main-container'>

                    <div className="players-list-container">
                        <h2 className='title'>Waiting Room</h2>
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
                        <CopyToClipboard />
                        <button className='ready-btn' onClick={this.changeReady}>{(!currUser.isReady) ? 'Ready' : 'Not Ready'}</button>
                        {isAdmin && <button onClick={this.startGame}>Start Game</button>}
                    </div>
                    <div className='share-btn'>
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
