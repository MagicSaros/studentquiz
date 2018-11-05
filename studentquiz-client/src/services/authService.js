import axios from 'axios';

class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/oauth';
        this.clientId = 'studentquiz-client';
        this.clientSecret = 'jo709FR49Ft8ft589TF8265fyf595ftY';
    }

    performLogin(payload) {
        let url = this.baseUrl + '/token';
        let authHeader = btoa(this.clientId + ':' + this.clientSecret);
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                'Authorization': `Basic ${authHeader}`
            }
        }

        let urlencodedPaylod = [];
        Object
            .keys(payload)
            .forEach(key => urlencodedPaylod.push(encodeURIComponent(key) + '=' + encodeURIComponent(payload[key])));
        urlencodedPaylod = urlencodedPaylod.join('&');

        return axios.post(url, urlencodedPaylod, config);
    }

    performRegister(payload) {
        let url = this.baseUrl + '/register';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Content-type': 'application/json'
            }
        }

        return axios.post(url, payload, config)
    }
}

export default AuthService;