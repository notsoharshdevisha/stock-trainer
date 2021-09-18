import React, { useState } from 'react';
import Plot from 'react-plotly.js'

function GraphicsBox(props) {

  const [graphmode, setGraphMode] = useState('price')

  const toggleGraph = () => {
    if (graphmode === 'price') {
      setGraphMode(null)
    } else {
      setGraphMode('price')
    }
  }

  if (props.companyInfo) {
    return (
      <div className="GraphicsBox">

        <div className="CompanyLogo">
          <img className="LogoImage" src={props.companyInfo['logo_url']} />
        </div>

        <div className="CompanyName">
          {props.companyInfo['longName']}
        </div>

        <div className="ShortInfo">
          {props.companyInfo['city']}, {props.companyInfo['state']}, {props.companyInfo['country']}
        </div>

        <div className="CompanySummary">
          <p className="CompanySummaryText">
            {props.companyInfo['longBusinessSummary']}
          </p>
        </div>

        <div className="GraphmodeButton">
          {
            graphmode ?
              <div>
                <button className="btn btn-primary"
                  onClick={toggleGraph}>
                  To Volume</button>
              </div>
              :
              <div>
                <button className="btn btn-primary"
                  onClick={toggleGraph}>
                  To Price</button>
              </div>
          }
        </div>

        <div className="Plots">
          {graphmode ?
            <Plot
              data={[
                {
                  x: props.stockData['Date'],
                  y: props.stockData['Close'],
                  fill: 'tozeroy',
                  type: 'scatter',
                  mode: 'lines',
                  marker: { color: 'grey' },
                  plot_bgcolor: "#f1234"
                },
              ]}
              layout={
                {
                  width: 1500,
                  height: 600,
                  title: { text: props.companyInfo['longName'], font: { color: 'white' } },
                  plot_bgcolor: '#212121',
                  paper_bgcolor: '#212121',
                  xaxis: {
                    color: 'white',
                    tickfonts: { color: 'white' },
                    showgird: true,
                    zeroline: true,
                  },
                  yaxis: {
                    title: 'Price',
                    color: 'white',
                    tickfonts: { color: 'white' },
                    showgrid: true,
                    zeroline: true,
                  }
                }
              }
            />
            :
            <Plot
              data={[
                {
                  x: props.stockData['Date'],
                  y: props.stockData['Volume'],
                  fill: 'tozeroy',
                  type: 'scatter',
                  mode: 'lines',
                  marker: { color: 'grey' },
                  plot_bgcolor: "#f1234"
                },
              ]}
              layout={
                {
                  width: 1500,
                  height: 600,
                  title: { text: props.companyInfo['longName'], font: { color: 'white' } },
                  plot_bgcolor: '#212121',
                  paper_bgcolor: '#212121',
                  xaxis: {
                    color: 'white',
                    tickfonts: { color: 'white' },
                    showgird: true,
                    zeroline: true,
                  },
                  yaxis: {
                    title: 'Volume',
                    color: 'white',
                    tickfonts: { color: 'white' },
                    showgrid: true,
                    zeroline: true,
                  }
                }
              }
            />
          }
        </div>

      </div>
    )
  } else {
    return (
      <div className="EmptyGraphicsBox">
      </div>
    )
  }
}

export default GraphicsBox
