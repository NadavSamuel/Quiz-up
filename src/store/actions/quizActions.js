import {quizService} from '../../services/quizService'

export function loadQuizzes() {
    return dispatch => {
        quizService.query().then(cars => {
            dispatch({ type: 'SET_CARS', cars })
        })
    }
}