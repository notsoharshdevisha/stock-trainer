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
    return str.substring(0, digitsToDisplay) + ' T'
  } else if (str.length > 9 && str.length < 13) {
    digitsToDisplay = str.length - 9
    return str.substring(0, digitsToDisplay) + ' B'
  } else if (str.length > 6 && str.length < 10) {
    digitsToDisplay = str.length - 6
    return str.substring(0, digitsToDisplay) + ' M'
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

  const localResetDates = () => {
    props.setStartDate(null)
    props.setToDate(null)
    window.location.reload(false)
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
          onChange={e => props.setTicker(e.target.value)}
        />
      </div>

      <div className="StartDatePicker">
        <div className="StartDateLabel">
          <label>Start Date</label>
        </div>
        <input
          type="date"
          onChange={(e) => props.setStartDate(e.target.value)}
        />
      </div>

      <div className="ToDatePicker">
        <div className="ToDateLabel">
          <label>To Date</label>
        </div>
        <input
          type="date"
          onChange={(e) => props.setToDate(e.target.value)}
        />
      </div>

      <div className="FetchButton">
        <button className="btn btn-success"
          onClick={fetchAllData}
        >Fetch Data</button>
      </div>

      <div className="resetDate">
        <button className="btn btn-danger"
          onClick={localResetDates}
        >Reset</button>
      </div>

      <div className="InfoTableHeading">
        <hr />
        <h6>Info</h6>
        <hr />
      </div>

      {
        props.companyInfo ?
          <div className="InfoTable">
            <table className="Table">
              <tr>
                <td>Currency:</td>
                {props.companyInfo['financialCurrency'] ?
                  <td className='TableFigures'>{props.companyInfo['financialCurrency']}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Price:</td>
                {props.companyInfo['currentPrice'] ?
                  <td className='TableFigures'>{props.companyInfo['currentPrice'].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Day High:</td>
                {props.companyInfo['dayHigh'] ?
                  <td className='TableFigures'>{props.companyInfo['dayHigh'].toFixed(2)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Day Low:</td>
                {props.companyInfo['dayLow'] ?
                  <td className='TableFigures'>{props.companyInfo['dayLow'].toFixed(2)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Volume:</td>
                {props.companyInfo['volume'] ?
                  <td className='TableFigures'>{ToShortFormat(props.companyInfo["volume"].toString())}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>52 Week High:</td>
                {props.companyInfo['fiftyTwoWeekHigh'] ?
                  <td className='TableFigures'>{props.companyInfo["fiftyTwoWeekHigh"].toFixed(2)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>52 Weeks Low:</td>
                {props.companyInfo['fiftyTwoWeekLow'] ?
                  <td className='TableFigures'>{props.companyInfo["fiftyTwoWeekLow"].toFixed(2)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Total Revenue:</td>
                {props.companyInfo['totalRevenue'] ?
                  <td className='TableFigures'>{ToShortFormat(props.companyInfo["totalRevenue"].toString())}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Revenue/Share:</td>
                {props.companyInfo['revenuePerShare'] ?
                  <td className='TableFigures'>{props.companyInfo['revenuePerShare'].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Revenue Growth:</td>
                {props.companyInfo['revenueGrowth'] ?
                  <td className='TableFigures'>{props.companyInfo['revenueGrowth'].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Debt To Equity:</td>
                {props.companyInfo['debtToEquity'] ?
                  <td className='TableFigures'>{props.companyInfo["debtToEquity"].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Return On Equity</td>
                {props.companyInfo['returnOnEquity'] ?
                  <td className='TableFigures'>{props.companyInfo['returnOnEquity'].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Return On Assets:</td>
                {props.companyInfo['returnOnAssets'] ?
                  <td className='TableFigures'>{props.companyInfo['returnOnAssets'].toFixed(3)}</td>
                  :
                  null}
              </tr>
              <tr>
                <td>Recommendation:</td>
                {props.companyInfo['recommendationKey'] ?
                  <td className='TableFigures'>{props.companyInfo['recommendationKey']}</td>
                  :
                  null}
              </tr>
            </table>
          </div>
          :
          null
      }

    </div >
  )
}

export default StockPicker;
