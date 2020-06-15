import React from "react"
import ReactDOM from "react-dom"

import Filter from './Filter'

import { Context } from "../App"

// Данный компонент определяет интерфейс заголовка
function Header() {
  // При нажатии onClick в данном компоненте следующая функция в основном компоненте будет вызвана
  // через контекст
  const { handleReload } = React.useContext(Context)

  // JSX заголовка
  return (
    <div id="header-container">
      <div id="header">
        <h1 id="header-text">List</h1>
        <button id="header-button" class="btn btn-secondary" onClick={handleReload}>
          <i class="fas fa-redo-alt"></i>
        </button>
      </div>
      <Filter />
    </div>
  )
}

export default Header
