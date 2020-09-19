import { quizService } from '../../services/quizService'

export function setNotification(kind,txt) {
    return dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', kind,txt })
    }
}

export function clearNotification() {
    return dispatch => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
    }
}