import './App.css';
import StockPickerBox from './components/stockpickerbox'
import GraphicsBox from './components/graphicsbox'
import React, { useState } from 'react';
import APIService from './APIService'


function App() {

  const [ticker, setTicker] = useState(null)
  const [companyInfo, setCompanyInfo] = useState(null)
  const [startDate, setStartDate] = useState(new Date())
  const [toDate, setToDate] = useState(new Date())
  const [stockData, setStockData] = useState()

  const mainSetTicker = (ticker) => {
    setTicker(ticker)
  }

  const mainFetchCompanyInfo = (ticker) => {
    APIService.FetchCompanyInfo(ticker)
      .then(response => setCompanyInfo(response))
      .catch(error => console.log(error))
  }

  const mainFetchStockData = (ticker, startDate, toDate) => {
    APIService.FetchStockData(ticker, startDate, toDate)
      .then(data => setStockData(data))
      .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <div className="Header">
        <header>
          <h1>Welcome!</h1>
        </header>
      </div>

      <div className="MainBody">
        <StockPickerBox
          mainFetchCompanyInfo={mainFetchCompanyInfo}
          mainFetchStockData={mainFetchStockData}
          companyInfo={companyInfo}
          mainSetTicker={mainSetTicker}
          ticker={ticker}
          startDate={startDate}
          toDate={toDate}
          setStartDate={setStartDate}
          setToDate={setToDate}
          setTicker={setTicker}
        />
        <GraphicsBox
          mainFetchStockData={mainFetchStockData}
          ticker={ticker}
          startDate={startDate}
          toDate={toDate}
          companyInfo={companyInfo}
          stockData={stockData}
        />
      </div>

    </div>
  );
}

export default App;
