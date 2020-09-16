const initialState = {
    quizzes: []
}

export function quizReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUIZZES':
            return {
                ...state,
                quizzes: action.quizzes
            }

        default:
            return state
    }
}