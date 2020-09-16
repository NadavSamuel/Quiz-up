import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadCars } from '../store/actions/carActions'
import { CarList } from '../cmps/CarList'

class _CarApp extends Component {

    componentDidMount() {
        this.props.loadCars()
    }

    render() {
        const { cars } = this.props
        if (!cars) return <div>Loading....</div>
        return (
            <div className="car-app">
                <CarList cars={ cars } />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        cars: state.carReducer.cars
    }
}
const mapDispatchToProps = {
    loadCars
}
export const CarApp = connect(mapStateToProps, mapDispatchToProps)(_CarApp)