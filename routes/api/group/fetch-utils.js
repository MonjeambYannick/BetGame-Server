const axios = require('axios');

require('dotenv').config()



let FETCH_GET_FROM_API = (route, params) => {

    console.log("ARARA" + API_URL + route);

    return axios.get(API_URL + route, {
        method: 'GET',
        headers: {
            'X-Auth-Token': API_TOKEN
        },
        params: params
    })

}

module.exports = { FETCH_GET_FROM_API }