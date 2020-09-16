const initialState = {
    quizzes: []
}

export function carReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUIZZES':
            return {
                ...state,
                cars: action.quizzes
            }

        default:
            return state
    }
}