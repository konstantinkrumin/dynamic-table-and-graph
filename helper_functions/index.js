import CanvasJS from 'canvasjs'

// Функция для создания графика  с помощью библиотеки CanvasJS
function createGraph(graphData) {
  let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Line Chart"
      },
      axisX:{
        title: "Year",
        titleFontSize: 16,
        titleFontColor: "dimGrey",
        valueFormatString: "YYYY"
      },
      axisY:{
        title: "Pantone Value",
        titleFontSize: 16,
        titleFontColor: "dimGrey",
        includeZero: true
      },
      data: [{
        type: "line",
        indexLabelFontSize: 16,
        dataPoints: graphData
      }]
  })
  return chart.render()
}

// Функция для запроса данных с API в случае изначальной загрузки страницы или при нажитии кнопки
// "Перезагрузка" в верхнем правом углу
function requestData(url, setIsLoaded, setDataset, setError) {
  return fetch(url)
    .then(response => response.json())
    .then(
    // Если запрос был успешен сделать следуещее:
    (result) => {
      setIsLoaded(true)

      // Пропарсим загруженные данные и довавим их в Local Storage
      for (let i=0; i < result.data.length; i++) {
        localStorage.setItem(result.data[i].id, JSON.stringify(result.data[i]))
        // Основной state hook в главном компоненте получает данные с Local Storage при начальной
        //загрузке
        setDataset(
          prevDataset => [...prevDataset, JSON.parse(localStorage.getItem(result.data[i].id))]
        )
      }
    },
    // Если запрос неуспешен - вывести сообщение об ошибке
    (error) => {
      setIsLoaded(true)
      setError(error)
    }
  )
}

export { createGraph, requestData }
