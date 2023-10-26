import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom" // Import BrowserRouter and Switch
import CarDetails from "./CarDetails"
import NotFound from "./NotFound" // Create a NotFound component
import Car from "./Car"
import CreateCarForm from "./CreateCarForm"

import "./App.css"

class App extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    this.fetchCarData()
  }

  fetchCarData = () => {
    fetch("http://localhost:8080/cars/all")
      .then(response => response.json())
      .then(data => {
        this.setState({ data })
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  handleDelete = id => {
    fetch(`http://localhost:8080/cars`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: id
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response accordingly
        console.log("Deleted:", data)
        // Refresh the data after deletion
        this.componentDidMount()
      })
      .catch(error => {
        console.error("Error:", error)
      })
  }

  handleUpdate = () => {
    this.fetchCarData()
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/cars/all">
              <div>
                <CreateCarForm onCarCreated={this.fetchCarData} />
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>MARK</th>
                      <th>MODEL</th>
                      <th>COLOUR</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map(car => (
                      <Car key={car.id} info={car} onDelete={this.handleDelete} onCarUpdated={this.handleUpdate} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Route>
            <Route path="/cars/:id" component={CarDetails} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
