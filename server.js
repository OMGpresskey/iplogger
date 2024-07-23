// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Discord 웹훅 URL
const webhookURL = 'https://discord.com/api/webhooks/1265301991173783612/lXKkMzvaujkH_AuHGePOw_JETj6UuskPbVYTkFy___Twe0Bwasb7ow78V-QQg00q2eZe';

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 클라이언트 IP 주소 추출 함수
function getClientIp(req) {
    return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
}

// 루트 엔드포인트
app.get('/', (req, res) => {
    const ip = getClientIp(req);
    const message = `새로운 방문자가 접속했습니다. IP 주소: ${ip}`;

    // 디스코드 웹훅으로 메시지 전송
    axios.post(webhookURL, {
        content: message
    })
    .then(response => {
        console.log('메시지 전송 성공:', response.data);
    })
    .catch(error => {
        console.error('메시지 전송 실패:', error);
    });

    // 응답 전송
    res.send('당신의 IP가 로그되고 있습니다');
});

// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
