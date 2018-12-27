import axios from 'axios';

class ConfigService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/config';
        this.accessToken = localStorage.getItem('access_token');
    }

    getAllowedCountries() {
        let url = this.baseUrl + '/countries';
        let token = this.accessToken ? this.accessToken : '';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        };

        return axios.get(url, config);
    }

    getCategories() {
        let url = this.baseUrl + '/quizzes/categories';
        let token = this.accessToken ? this.accessToken : '';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        };

        return axios.get(url, config);
    }
}

export default ConfigService;