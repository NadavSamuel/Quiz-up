import { userService } from '../../services/userService'

export function onLogin(credentials) {
    return async dispatch => {
        const user = await userService.login(credentials)
        dispatch({ type: 'SET_USER', user })

    }
}
export function onLoginSync(credentials) {
    return dispatch => {
        const user = userService.login(credentials)
        dispatch({ type: 'SET_USER', user })
    }
}