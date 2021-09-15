import React from 'react';
import Plot from 'react-plotly.js'

function GraphicsBox(props) {


    if (props.companyInfo) {
        return (
            <div className="GraphicsBox">

                <div className="CompanyLogo">
                    <img className="LogoImage" src={props.companyInfo['logo_url']}/>
                </div>

                <div className="CompanyName">
                    <h6>{props.companyInfo['longName']}</h6>
                </div>

                <div className="ShortInfo">
                    {props.companyInfo['city']}, {props.companyInfo['state']}, {props.companyInfo['country']}
                </div>

                <div className="CompanySummary">
                    <p className="CompanySummaryText">
                        {props.companyInfo['longBusinessSummary']}
                    </p>
                </div>

                <div className="Plots">

                    <Plot 
                        data={[
                            {
                                x: [1,2,3],
                                y: [2, 6, 3],
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                                plot_bgcolor: "#f1234"
                            },
                            {type: 'bar', x:[1,2,3], y:[2,5,3]},
                        ]}
                        layout={{width: 1300, height: 600, title: 'Plis'}}
                    />

                </div>

            </div>
        )
    } else {
        return (
            <div className="GraphicsBox">
            </div>
        )
    }
}

export default GraphicsBox
