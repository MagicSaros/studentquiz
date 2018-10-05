import axios from 'axios';

class QuizService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api';
    }

    getAllQuizzes() {
        let url = this.baseUrl + '/quizzes';
        let config = {
            headers: {
                'Accept': 'application/hal+json'
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
        let url = this.baseUrl + `/quizzes/${id}`;
        let config = {
            headers: {
                'Accept': 'application/hal+json'
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