import logo from './logo.svg';
import { useState, useEffect } from 'react'
import { Chart } from 'react-charts'

import './App.css';

function App() {
  const [data, setData] = useState(null)
  const [axes, setAxes] = useState([
    { primary: true, type: 'linear', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ])

  useEffect(() => {
    setInterval(() => {
      fetch('http://54.254.93.168:1111/viewDataPointByContract?contract=0xca68100dc0cc00cfba894370b60cccceb0c6cb2c')
        .then(res => res.json())
        .then((newData) => {
          console.log(newData)
          let tempData = []
          let arrData = []
          newData.map((dataValue, idx) => {
            arrData.push({
              x: idx,
              y: dataValue['Point']
            })
          })
          tempData.push({
            label: 'slime',
            data: arrData
          })
          setData(tempData)
        })
    }, 5000)

  }, [])
  if (data) {
    return (
      <div className="App">

        <div
          style={{
            width: '400px',
            height: '300px'
          }}
        >

          <Chart data={data} axes={axes} />
        </div>

      </div>
    );
  } else {
    return <></>
  }

}

export default App;
