const initialState = {
    users: [],
    loggedinUser: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedinUser: action.user
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}