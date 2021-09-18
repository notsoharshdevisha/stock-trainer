import React, { useState } from 'react';

/*
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
*/

function ToShortFormat(str) {
  let digitsToDisplay
  if (str.length > 12) {
    digitsToDisplay = str.length - 12
    return str.substring(0, digitsToDisplay) + ' Tn'
  } else if (str.length > 9 && str.length < 13) {
    digitsToDisplay = str.length - 9
    return str.substring(0, digitsToDisplay) + ' Bn'
  } else if (str.length > 6 && str.length < 10) {
    digitsToDisplay = str.length - 6
    return str.substring(0, digitsToDisplay) + ' Mn'
  } else if (str.length > 3 && str.length < 7) {
    digitsToDisplay = str.length - 3
    return str.substring(0, digitsToDisplay) + ' Th'
  } else {
    return str
  }
}

function StockPicker(props) {


  const fetchAllData = () => {
    props.mainFetchCompanyInfo(props.ticker)
    props.mainFetchStockData(props.ticker, props.startDate, props.toDate)
  }

  const localSetStartDate = (value) => {
    props.mainSetStartDate(value.toString())
  }

  const localSetToDate = (value) => {
    props.mainSetToDate(value.toString())
  }

  const localSetTicker = (value) => {
    props.mainSetTicker(value)
  }

  return (
    <div className='StockPickerBox'>

      <div className='StockPickerBoxTitle'>
        <hr />
        <h2>Pick a stock!</h2>
        <hr />
      </div>

      <div className="TickerForm">
        <input className="form-control"
          type="text"
          placeholder="TICKER"
          onChange={e => localSetTicker(e.target.value)}
        />
      </div>

      <div className="StartDatePicker">
        <div className="StartDateLabel">
          <label>Start Date</label>
        </div>
        <input
          type="date"
          onChange={(e) => localSetStartDate(e.target.value)}
        />
      </div>

      <div className="ToDatePicker">
        <div className="ToDateLabel">
          <label>To Date</label>
        </div>
        <input
          type="date"
          onChange={(e) => localSetToDate(e.target.value)}
        />
      </div>

      <div className="FetchButton">
        <button className="btn btn-success"
          onClick={fetchAllData}
        >Fetch Data</button>
      </div>

      <div className="InfoTableHeading">
        <hr />
        <h6>Info</h6>
        <hr />
      </div>

      {props.companyInfo ?
        <div className="InfoTable">
          <table className="Table">
            <tr>
              <td>Currency:</td>
              <td className='TableFigures'>{props.companyInfo['financialCurrency']}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td className='TableFigures'>{props.companyInfo['currentPrice'].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Day High:</td>
              <td className='TableFigures'>{props.companyInfo['dayHigh'].toFixed(2)}</td>
            </tr>
            <tr>
              <td>Day Low:</td>
              <td className='TableFigures'>{props.companyInfo['dayLow'].toFixed(2)}</td>
            </tr>
            <tr>
              <td>Volume:</td>
              <td className='TableFigures'>{ToShortFormat(props.companyInfo["volume"].toString())}</td>
            </tr>
            <tr>
              <td>52 Week High:</td>
              <td className='TableFigures'>{props.companyInfo["fiftyTwoWeekHigh"].toFixed(2)}</td>
            </tr>
            <tr>
              <td>52 Weeks Low:</td>
              <td className='TableFigures'>{props.companyInfo["fiftyTwoWeekLow"].toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total Revenue:</td>
              <td className='TableFigures'>{ToShortFormat(props.companyInfo["totalRevenue"].toString())}</td>
            </tr>
            <tr>
              <td>Revenue/Share:</td>
              <td className='TableFigures'>{props.companyInfo['revenuePerShare'].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Revenue Growth:</td>
              <td className='TableFigures'>{props.companyInfo['revenueGrowth'].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Debt To Equity:</td>
              <td className='TableFigures'>{props.companyInfo["debtToEquity"].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Return On Equity</td>
              <td className='TableFigures'>{props.companyInfo['returnOnEquity'].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Return On Assets:</td>
              <td className='TableFigures'>{props.companyInfo['returnOnAssets'].toFixed(3)}</td>
            </tr>
            <tr>
              <td>Recommendation:</td>
              <td className='TableFigures'>{props.companyInfo['recommendationKey']}</td>
            </tr>
          </table>
        </div>
        :
        null
      }

    </div>
  )
}

export default StockPicker;
