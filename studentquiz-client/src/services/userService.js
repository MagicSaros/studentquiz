import axios from 'axios';

class UserService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/users';
    }

    getCurrentUser() {
        let url = this.baseUrl + '/me';
        let token = localStorage.getItem('access_token');
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        }

        return axios
            .get(url, config)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.log('Current user request error');
                    return null;
                }
            })
    }
}

export default UserService;