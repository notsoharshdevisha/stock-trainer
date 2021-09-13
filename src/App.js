import './App.css';
import StockPickerBox from './components/stockpickerbox'
import GraphicsBox from './components/graphicsbox'
import React, { useState } from 'react';
import APIService from './APIService'


function App() {

    const [companyInfo, setCompanyInfo] = useState(null)

    const mainFetchCompanyInfo = (ticker, startDate, toDate) => {
        APIService.FetchCompanyInfo(ticker, startDate, toDate)  
        .then(response => setCompanyInfo(response))
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
                companyInfo={companyInfo}
            />
            <GraphicsBox companyInfo={companyInfo}/>
        </div>

   </div>
  );
}

export default App;
