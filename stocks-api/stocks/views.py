from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import yfinance as yf
import pandas as pd

# Create your views here.

def company_info(request, ticker):
    """ fro company info """

    company = yf.Ticker(ticker)

    if request.method == 'GET':
        return JsonResponse(company.info)

def stock_data(request, ticker, start_date, to_date):
    """ for stock data """

    def to_str(date):
        return str(date.date())
    
    def return_all_data(data, data_dict):
        data = data.reset_index()
        data['Date'] = data['Date'].apply(to_str) 
        for col in data.columns:
            data_dict[col] = list(data[col])
        return data_dict

    data_dict = {}
    all_data = yf.download(ticker)

    #Checks for no date selection. No date selection returns non supported long format
    if ((len(start_date) == 10) & (len(to_date) == 10)):

        start_date = pd.to_datetime(start_date)
        to_date = pd.to_datetime(to_date)
        

        if ((start_date >= all_data.index[0]) & (to_date <= all_data.index[-1])):
            masked_data = all_data[((all_data.index >= start_date) & (all_data.index <= to_date))]
            masked_data = masked_data.reset_index()
            masked_data['Date'] = masked_data['Date'].apply(to_str)
            
            for col in masked_data.columns:
                data_dict[col] = list(masked_data[col])
            return JsonResponse(data_dict)
        else:
            response = return_all_data(all_data, data_dict)
            response['dateError'] = 'Inappropriate Dates'
            return JsonResponse(response)
    else:
        return JsonResponse(return_all_data(all_data, data_dict))
