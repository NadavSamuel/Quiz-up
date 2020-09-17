import { userService } from '../../services/userService'

export function onLoginAsync(credentials) {
    return async dispatch => {
        const user = await userService.login(credentials)
        dispatch({ type: 'SET_USER', user })

    }
}
export function onLoginSync(credentials) {
    console.log('cred at actions:',credentials);
    return dispatch => {
        const user = userService.login(credentials)
        dispatch({ type: 'SET_USER', user })
    }
}