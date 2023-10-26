import React, { Component } from "react"

class CarDetails extends Component {
  state = {
    car: null
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.fetchCar(id)
  }

  fetchCar = id => {
    fetch(`http://localhost:8080/cars/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ car: data })
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  render() {
    const { car } = this.state

    if (!car) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <p>ID: {car.id}</p>
        <p>MARK: {car.mark}</p>
        <p>MODEL: {car.model}</p>
        <p>COLOUR: {car.colour}</p>
      </div>
    )
  }
}

export default CarDetails
