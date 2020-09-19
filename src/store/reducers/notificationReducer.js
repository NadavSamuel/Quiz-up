const initialState = {
    txt: '',
    kind: ''
}

export function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            console.log(action.txt);
            return {
                ...state,
                txt: action.txt,
                kind: action.kind
            }
        case 'CLEAR_NOTIFICATION':
            return {
                ...state,
                txt: "",
                kind: ""
            }

        default:
            return state
    }
}