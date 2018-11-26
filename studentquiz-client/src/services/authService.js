import axios from 'axios';

import UserService from './userService';

class AuthService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/oauth';
        this.clientId = 'studentquiz-client';
        this.clientSecret = 'jo709FR49Ft8ft589TF8265fyf595ftY';
        this.userService = new UserService();
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

    changePassword(payload) {
        let url = this.baseUrl + '/change_password';
        let token = localStorage.getItem('access_token');
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        return axios.post(url, payload, config);
    }

    async updateCurrentUser() {
        let user = await this.userService.getCurrentUser();

        if (!user) {
            return;
        }

        localStorage.setItem('current_user', JSON.stringify(user));
    }
}

export default AuthService;