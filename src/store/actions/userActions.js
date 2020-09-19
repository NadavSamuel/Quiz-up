import { userService } from '../../services/userService'

export function onLogin(credentials) {
  return async dispatch => {
    const user = await userService.login(credentials)
    dispatch({ type: 'SET_USER', user })

  }
}
export function onLogout() {
  return async dispatch => {
    await userService.logout();
    dispatch({ type: 'SET_USER', user: null });
  };
}

export function onSignup(cred) {
  return async dispatch => {
    const user = await userService.add(cred)
    dispatch({ type: 'SET_USER', user })
  }
}