import React from 'react';
import { connect } from 'react-redux'
import ClearIcon from '@material-ui/icons/Clear';
import { clearNotification } from '../store/actions/notificationActions.js'

class _Notification extends React.Component {
    state = {
        isShown: false,
        txt: '',
        kind: ''
    }


    componentDidMount() {

        setTimeout(() => this.setState({ isShown: false }), 3000)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate -> prevProps.txt!=this.props.txt", prevProps.txt, this.props.txt)
        if (prevProps.txt != this.props.txt) {

            this.setState({ txt: this.props.txt, kind: this.props.kind, isShown: true })
            console.log("componentDidUpdate -> this.props.txt", this.props.txt)

            setTimeout(() => {
                this.props.clearNotification()
                this.setState({ txt: '', kind: '', isShown: false }
                )
            }, 3000)
        }
    }





    render() {
        const { isShown, txt, kind } = this.state
        return (
            <div className={`notification-box ${kind}`}>
                {isShown && <span onClick={() => this.setState({ txt: '', kind: '', isShown: false })}><ClearIcon /></span>}
                {isShown && <p>{txt}</p>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        txt: state.notificationReducer.txt,
        kind: state.notificationReducer.kind,

    }
}
const mapDispatchToProps = {
    clearNotification
}
export const Notification = connect(mapStateToProps, mapDispatchToProps)(_Notification)