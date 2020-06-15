import React from "react"
import ReactDOM from "react-dom"

import { Interface } from './components/Interface'
import { requestData, createGraph } from './helper_functions/index'

const Context = React.createContext()

function App() {
  // Зададим default значения для хуков
  const DEFAULT_ERROR = null
  const DEFAULT_IS_LOADED = false
  const DEFAULT_DATASET = []
  const DEFAULT_INPUT_VALUE = ''
  const DEFAULT_DROPDOWN_VALUE = 'year'
  const DEFAULT_GRAPH_DATA = []

  const URL = 'https://reqres.in/api/unknown'

  // Создадим useState хуки
  // Хуки для отслеживания ошибок и загрузки при совершении AJAX request
  const [ error, setError ] = React.useState(DEFAULT_ERROR)
  const [ isLoaded, setIsLoaded ] = React.useState(DEFAULT_IS_LOADED)
  const [ dataset, setDataset ] = React.useState(DEFAULT_DATASET)

  const [ inputValue, setInputValue ] = React.useState(DEFAULT_INPUT_VALUE)
  const [ dropdownValue, setDropdownValue ] = React.useState(DEFAULT_DROPDOWN_VALUE)

  const { graphData, setGraphData } = React.useState(DEFAULT_GRAPH_DATA)

  // useEffect hook сделает запрос на API каждый раз когда наш компонент инициализируется
  React.useEffect(() => {
    requestData(URL, setIsLoaded, setDataset, setError)
  }, [])

  // Следущая функция делает новый запрос на API и перезагружает данные
  function handleReload() {
    setDataset(DEFAULT_DATASET)
    setInputValue(DEFAULT_INPUT_VALUE)

    requestData(URL, setIsLoaded, setDataset, setError)
  }

  // Функция для отслеживания ввода текста в input field фильтра
  function handleInput(event) {
    event.preventDefault()
    setInputValue(event.target.value)
  }

  // Функция, позволяющая выбирать нужное поле в dropdown button
  function handleDropdown(event) {
    event.preventDefault()
    setDropdownValue(event.target.value)
  }

  // Функция, позволяющая фильтровать согласно тексту в input field
  function handleFiltering(event) {
    event.preventDefault()

    if (inputValue.length > 0) {
      // switch statement позволяет отфильтровать значения в таблице по следующим трем параметрам:
      // 'year', 'name', 'color'
      switch (dropdownValue) {
        case 'year':
          setDataset(prevDataset => prevDataset.filter(item => item.year == inputValue))
          break
        case 'name':
          setDataset(
            prevDataset => prevDataset.filter(
              item => item.name.toLowerCase().includes(inputValue.toLowerCase())
            )
          )
          break
        case 'color':
          setDataset(
            prevDataset => prevDataset.filter(
              item => item.color.toLowerCase().includes(inputValue.toLowerCase())
            )
          )
          break
      }
    }
  }

  // Функция позволяющая удалить элементы таблицы индивидуально
  function handleDeletion(event) {
    const id = event.currentTarget.value

    setDataset(prevDataset => prevDataset.filter(item => item.id !== parseInt(id)))
    localStorage.removeItem(id)
  }

  // Следущая функция вызывается при нажатии кнопки 'Create Graph' и парсит данные нахождения
  // необходимых переменных и создания нового массива, который будет передан в
  // createGraph функцию для создания графика
  function handleGraphCreation() {
    const dataParsed = dataset.map(
      item => ({
        x: new Date(item.year, 01, 01),
        y: parseInt(item.pantone_value.slice(3))
      })
    )
    createGraph(dataParsed)
  }

  /* Если ошибка, соответствующая ошибка будет отображена в окне браузера,
  если страница еще не загрузилась 'Loading' будет выведено в окне браузера,
  если все было успешно загружено - подгружаем Interface компонент и передаем
  контекст через Provider в его дочерние компоненты */
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Context.Provider value={{
          dataset,
          handleReload,
          handleDeletion,
          handleGraphCreation,
          handleFiltering,
          handleInput,
          handleDropdown,
          inputValue
        }}>
        <Interface />
      </Context.Provider>
    );
  }
}

export default App
