const initialState = {
    cars: []
}

export function carReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CARS':
            return {
                ...state,
                cars: action.cars
            }

        default:
            return state
    }
}