import React from "react"
import ReactDOM from "react-dom"

/* В данном компоненте таблица динамически отображает элементы переданные из головного компонента
и при нажатии кнопки 'Delete' удаляет соответствующую строку */
function TableData() {
  const { dataset, handleDeletion} = React.useContext(Context)

  return dataset.map((item, index) => {
    const { id, name, year, color, pantone_value } = item
    return (
      <tr key={id}>
        <td>{year}</td>
        <td>{name}</td>
        <td style={{ backgroundColor: color, width: "100px" }} />
        <td>
          <button
            value={id}
            type="button"
            class="btn btn-outline-danger" 
            onClick={handleDeletion}>
            <i class="far fa-trash-alt"></i>
          </button>
        </td>
      </tr>
    )
  })
}

export default TableData
