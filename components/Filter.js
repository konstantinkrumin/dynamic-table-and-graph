import React from "react"
import ReactDOM from "react-dom"

// Данный комонент определяет JSX фильтрации и передает необходимые параметры для соответствующих
// функций в головном компоненте через useContext hook
function Filter() {
  const { handleFiltering, handleInput, inputValue, handleDropdown } = React.useContext(Context)

  return (
    <form onSubmit={handleFiltering}>
      <select
        id="dropdown-selection"
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-toggle="dropdown"
        onChange={handleDropdown}>
        <option selected value="year">Year</option>
        <option value="name">Name</option>
        <option value="color">Hex</option>
      </select>

      <input
        id="input-field"
        placeholder="Input text here"
        value={inputValue}
        onChange={handleInput} />

      <button
        id="filtering-button"
        type="submit"
        value="Filter"
        class="btn btn-secondary">
        Filter
      </button>
    </form>
  )
}

export default Filter
