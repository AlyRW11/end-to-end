import React, { Component } from 'react';

export default class extends Component {
    state = {
        cars: []
      }
    
      getData = async (path) => {
        const url = `http://localhost:3001${path}`
        const response = await fetch(url)
        const data = await response.json()
    
        return data
      }

      displayCars = (cars) =>{
        const carElement = []
        for (const car of cars){
          carElement.push(this.renderCar(car))
      }
        return carElement
      }
    
      async componentDidMount() {
        const carsResponse = await this.getData("/cars")
        this.setState({ cars: carsResponse.cars })
      }

      renderCar = (car) =>{
        return (
        <div key={car.make + car.model}>
          <h1>{car.make}</h1>
          <h2>{car.model}</h2>
          <h3>{car.year}</h3>
          <h4>{car.mileage}</h4>
        </div>
        )
    }

    renderCars = (cars) => {
        const carElements = cars.map((car)=> {
            return this.renderCar(car)
        })
        
        return carElements
    }

    render(){
        return (
            <div>
            {this.renderCars(this.state.cars)}
            </div>
        )
    }
}