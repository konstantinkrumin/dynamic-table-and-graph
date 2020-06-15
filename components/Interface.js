import React from "react"
import ReactDOM from "react-dom"

import Header from './Header'
import Table from './Table'
import Graph from './Graph'

/* Данный stateless functional component задает порядок, в котором каждый дочерний компонент
будет отображен */
function Interface() {
  return (
    <div>
      <Header />
      <hr />
      <Table />
      <Graph />
    </div>
  )
}

export default Interface
