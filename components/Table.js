import React from "react"
import ReactDOM from "react-dom"

import TableHeader from './TableHeader'
import TableData from './TableData'

// Данный компонент определяет JSX таблицы и ее заголовка
function Table() {
  const { handleGraphCreation } = React.useContext(Context)

  return (
    <div id="table-container">
      <table id="table">
        <tbody>
          <TableHeader />
          <TableData />
        </tbody>
      </table>

      <button
        id="graph-button"
        type="button"
        class="btn btn-secondary"
        onClick={handleGraphCreation}>
        Create Graph
      </button>
    </div>
  )
}

export default Table
