import React from "react"
import ReactDOM from "react-dom"

// Компонент с заголовком таблицы
function TableHeader() {
  return (
    <tr>
      <th>Year</th>
      <th>Name</th>
      <th>Color</th>
      <th>Delete</th>
    </tr>
  )
}

export default TableHeader
