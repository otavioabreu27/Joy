import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 2,         
    duration: '60s',
    rps: 30,          
};

export default function () {
    const url = 'http://localhost:80/register';

    const response = http.post(
        url,
        {
            "token": "abc123",
            "status": "success",
            "message": "Hello, RabbitMQ!",
            "datetime": "2022-01-25T12:34:56Z"
        },
        { 'Content-Type': 'application/json' }
    );
    sleep(1);
}