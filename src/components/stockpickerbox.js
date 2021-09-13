import React, {useState} from 'react';

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


function StockPicker(props) {

    const [startDate, setStartDate] = useState(new Date())
    const [toDate, setToDate] = useState(new Date())
    const [ticker, setTicker] = useState(null)

    const localFetchCompanyInfo = () => {
        props.mainFetchCompanyInfo(ticker, startDate, toDate)
    }

    return (
        <div className='StockPickerBox'>

            <div className='StockPickerBoxTitle'>
                <h2>Pick a stock!</h2>
            </div>

            <input className="form-control"
                type="text" 
                placeholder="TICKER" 
                onChange={e => setTicker(e.target.value)}
            />

            <div className="StartDatePicker">
                <div className="StartDateLabel">
                    <label>Start Date</label>
                </div>
                <input 
                    type="date" 
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="ToDatePicker">
                <div className="ToDateLabel">
                    <label>To Date</label>
                </div>
                <input 
                    type="date" 
                    onChange={(e) => setToDate(e.target.value)}
                />
            </div>

            <div className="FetchButton">
                <button className="btn btn-success"
                    onClick={localFetchCompanyInfo}
                >Fetch Data</button>
            </div>

            <div className="InfoTableHeading">
                <hr/>
                    <h6>Info</h6>
                <hr />
            </div>

            { props.companyInfo ?  
                <div className="InfoTable">
                    <table className="Table">
                        <tr>
                            <td>Currency:</td>
                            <td>{props.companyInfo['financialCurrency']}</td>
                        </tr>
                       <tr>
                            <td>Price:</td>
                            <td>{props.companyInfo['currentPrice']}</td>
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
