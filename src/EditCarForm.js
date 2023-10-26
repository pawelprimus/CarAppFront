import React, { Component } from "react"

class EditCarForm extends Component {
  state = {
    mark: this.props.car.mark,
    model: this.props.car.model,
    colour: this.props.car.colour
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { mark, model, colour } = this.state
    const updatedCar = { ...this.props.car, mark, model, colour }

    fetch(`http://localhost:8080/cars/${this.props.car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedCar)
    })
      .then(response => {
        if (response.status === 200) {
          console.log("Car updated successfully")
          this.props.onCarUpdated()
        } else {
          console.log("Failed to update car")
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  render() {
    const { mark, model, colour } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Mark:
          <input type="text" name="mark" value={mark} onChange={this.handleChange} />
        </label>
        <label>
          Model:
          <input type="text" name="model" value={model} onChange={this.handleChange} />
        </label>
        <label>
          Colour:
          <input type="text" name="colour" value={colour} onChange={this.handleChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    )
  }
}

export default EditCarForm
