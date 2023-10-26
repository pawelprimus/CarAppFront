import React, { Component } from "react"

class CreateCarForm extends Component {
  state = {
    id: 0,
    mark: "",
    model: "",
    colour: ""
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { id, mark, model, colour } = this.state
    const newCar = { id: Number(id), mark, model, colour }

    fetch("http://localhost:8080/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCar)
    })
      .then(response => {
        if (response.status === 201) {
          console.log("Car created successfully")
          // Reset the form fields after successful creation
          this.setState({ id: 0, mark: "", model: "", colour: "" })
          // Refresh the car list
          this.props.onCarCreated()
        } else {
          console.log("Failed to create car")
        }
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  render() {
    const { id, mark, model, colour } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          ID:
          <input type="number" name="id" value={id} onChange={this.handleChange} />
        </label>
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
        <button type="submit">Create</button>
      </form>
    )
  }
}

export default CreateCarForm
