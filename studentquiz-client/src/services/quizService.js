import axios from 'axios';

class QuizService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/quizzes';
        this.accessToken = localStorage.getItem('access_token');
    }

    getAllQuizzes() {
        let url = this.baseUrl;
        let token = this.accessToken ? this.accessToken : '';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        };

        return axios
            .get(url, config)
            .then(response => {
                if (response.status === 200) {
                    return response.data._embedded.quizDtoList;
                } else {
                    console.log('Request error');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    getQuiz(id) {
        let url = this.baseUrl + `/${id}`;
        let token = this.accessToken ? this.accessToken : '';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        };

        return axios
            .get(url, config)
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    console.log('Request error');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export default QuizService;