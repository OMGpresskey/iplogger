const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const webhookUrl = 'https://discord.com/api/webhooks/1265301991173783612/lXKkMzvaujkH_AuHGePOw_JETj6UuskPbVYTkFy___Twe0Bwasb7ow78V-QQg00q2eZe';

let loggedIPs = new Set();

app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  if (!loggedIPs.has(ip)) {
    loggedIPs.add(ip);
    const message = `새로운 방문자가 접속했습니다. IP 주소: ${ip}`;

    axios.post(webhookUrl, { content: message })
      .then(response => {
        console.log('메시지가 디스코드로 전송되었습니다.');
      })
      .catch(error => {
        console.error('디스코드로 메시지를 전송하는 중 오류가 발생했습니다.', error);
      });
  }

  res.send('Hello, your IP has been logged!');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
