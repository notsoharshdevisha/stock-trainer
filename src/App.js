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

    const mainSetTicker = (ticker) => {
        setTicker(ticker)
    }

    const mainSetStartDate = (startDate) => {
        setStartDate(startDate)
    }

    const mainSetToDate = (toDate) => {
        setToDate(toDate)
    }

    const mainFetchCompanyInfo = (ticker) => {
        APIService.FetchCompanyInfo(ticker)  
        .then(response => setCompanyInfo(response))
        .catch(error => console.log(error))
    }

    const mainFetchStockData = (ticker, startDate, toDate) => {
        APIService.FetchStockData(ticker, startDate, toDate)
        .then(data => console.log(data))
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
                mainSetStartDate={mainSetStartDate}
                mainSetToDate={mainSetToDate}
                ticker={ticker}
                startDate={startDate}
                toDate={toDate}
            />
            <GraphicsBox 
                mainFetchStockData={mainFetchStockData}
                ticker={ticker}
                startDate={startDate}
                toDate={toDate}
                companyInfo={companyInfo}
            />
        </div>

   </div>
  );
}

export default App;
