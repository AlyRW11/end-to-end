import React, { Component } from 'react';

export default class extends Component {
    state = {
        cars: [],
        planes: []
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
        const planesResponse = await this.getData("/planes")
        this.setState({ 
            cars: carsResponse.cars, 
            planes: planesResponse.planes 
        })
        
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
        const carElements = cars
        .filter((car, index, array) => {
            console.log(car.make)
            return ("A"<= car.make && car.make <= "M")
            || ("a"<= car.make && car.make <= "m")
        })
        .map(this.renderCar)

        return carElements
    }

    renderPlane = (plane) => {
        return (
            <div>
                {
                    plane.class === "fighter"
                    ? <h1>{plane.name}</h1>
                    : plane.class === "cargo"
                        ? <h2>{plane.name}</h2>
                        : plane.class === "transportation"
                        ? <h3>{plane.name}</h3>
                        : <div>ERROR</div>
                }
            </div>
        )
    }

    render(){
        return (
            <div>
            {this.state.planes.map(this.renderPlane)}
            {this.renderCars(this.state.cars)}
            </div>
        )
    }
}