import { connect } from 'react-redux'
import React, { Component } from 'react'
import { chartjs } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { quizService } from '../services/quizService'
import { utilService } from '../services/utilService'
import { dashBoardService } from '../services/dashboardService'
import { Timer } from '../cmps/Timer';

class _Dashboard extends Component {

    state={
        quizzes:[]
    }

    componentDidMount() {
        this.getQuizzes();
    }

    async getQuizzes(){
        const quizzes = await quizService.query()
        this.setState({quizzes})
    }

    getTagData =()=>{
        const map = dashBoardService.getTagsMap(this.state.quizzes);
        return dashBoardService.flipMapToDonate(map)
    }
    
    getDifficulityData =()=>{
        const map = dashBoardService.getDifficulityMap(this.state.quizzes);
        return dashBoardService.flipMapToDonate(map)
    }
    
    getRatedData =()=>{
        const map = dashBoardService.getRatedMap(this.state.quizzes);
        return dashBoardService.flipMapToDonate(map)
    }

    render() {
        return (
            <div className='main-container'>
            <div className='mt10'>
                <h2>Tags:</h2>
                <Doughnut data={this.getTagData()} />
            </div>
            <div className='mt10'>
                <h2>Difficulity:</h2>
                <Doughnut data={this.getDifficulityData()} />
            </div>
            <div className='mt10'>
                <h2>Rate:</h2>
                <Doughnut data={this.getRatedData()} />
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
       
    }
}
const mapDispatchToProps = {
    
}
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)

