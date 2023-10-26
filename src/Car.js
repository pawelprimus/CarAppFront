import React, { Component } from "react"
import EditCarForm from "./EditCarForm"
import "./Car.css" // Import the CSS file for Car component styles

class Car extends Component {
  state = {
    isEditing: false
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing })
  }

  handleUpdate = () => {
    this.toggleEdit()
    this.props.onCarUpdated()
  }

  render() {
    const { id, mark, model, colour } = this.props.info

    if (this.state.isEditing) {
      return (
        <tr>
          <td colSpan="5" className="edit-form">
            <EditCarForm car={this.props.info} onCarUpdated={this.handleUpdate} />
            <button onClick={this.toggleEdit}>Cancel</button>
          </td>
        </tr>
      )
    } else {
      return (
        <tr>
          <td className="table-cell">
            <a href={`/cars/${id}`}>{id}</a>
          </td>
          <td className="table-cell">{mark}</td>
          <td className="table-cell">{model}</td>
          <td className="table-cell">{colour}</td>
          <td className="table-cell">
            <button onClick={() => this.props.onDelete(id)}>Delete</button>
            <button onClick={this.toggleEdit}>Edit</button>
          </td>
        </tr>
      )
    }
  }
}

export default Car
