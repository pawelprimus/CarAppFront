import React from "react"

const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p>http://localhost:8080/cars/all</p>
      <a href="http://localhost:3000/cars/all">http://localhost:3000/cars/all</a>
    </div>
  )
}

export default NotFound
