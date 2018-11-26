import axios from 'axios';

class ResultService {
    constructor() {
        this.baseUrl = 'http://localhost:8080/api/results';
        this.accessToken = localStorage.getItem('access_token');
    }

    sendResult(result) {
        let url = this.baseUrl;
        let token = this.accessToken ? this.accessToken : '';
        let config = {
            headers: {
                'Accept': 'application/hal+json',
                'Authorization': token
            }
        }

        return axios
            .post(url, result, config)
            .then(response => {
                if (response.status === 201) {
                    return response.data;
                } else {
                    console.log('Request error');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    calculateResult(questions, answers) {
        let total = 0;
        questions.forEach(question => {
            let text = question.text;
            if (answers[text]) {
                let selectedOption = answers[text];
                if (question.options[selectedOption]) {
                    total++;
                }
            }
        });
        let percantage = Math.round(total / questions.length * 100, 2);
        return percantage;
    }
}

export default ResultService;