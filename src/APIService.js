export default class APIService {

    static FetchCompanyInfo(ticker) {

        return fetch(`http://127.0.0.1:8000/${ticker}/`, {
            'method': 'GET',
        })
        .then(response => response.json())
    }
}
