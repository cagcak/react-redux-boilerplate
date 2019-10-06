import { fetchDataBegin, fetchDataSuccess, fetchDataFailure } from '.'
let fakeData = require('./fakeData.json')

function fakeGetData() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve( fakeData )
        }, 1000)
    })
}

// eslint-disable-next-line no-unused-vars
function getAppData() {
    return fetch('http://example.com/api/data')
        .then(httpErrorHandler)
        .then(res => res.json())
}

function httpErrorHandler(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response
}

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin())

        const RequestMethod = process.env.REACT_APP_API_READY ? getAppData() : fakeGetData()

        return RequestMethod
            .then(json => {
                dispatch(fetchDataSuccess(json.data));
                return json.data;
            })
            .catch(error =>
                dispatch(fetchDataFailure(error))
            )
    }
}