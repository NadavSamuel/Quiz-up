import { carService } from '../../services/carService'

export function loadCars() {
    return dispatch => {
        carService.query().then(cars => {
            dispatch({ type: 'SET_CARS', cars })
        })
    }
}