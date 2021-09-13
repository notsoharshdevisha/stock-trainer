import React, { useState } from 'react';

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
