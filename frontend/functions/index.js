const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // 모든 출처에 대해 CORS 허용

const allowedOrigins = ['http://localhost:5173', 'https://oss-ggok.web.app'];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

const NAVER_CLIENT_ID = 'WDVId7gO_fHzG7oRtf5w';
const NAVER_CLIENT_SECRET = 'q4MDc81Fjb';

app.get('/search', async (req, res) => {
  const { query } = req.query;
  const apiUrl = `https://openapi.naver.com/v1/search/local.json?query=${encodeURIComponent(query)}&display=5`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'X-Naver-Client-Id': NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
      }
    });
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Access-Control-Allow-Methods', 'GET, POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Allow-Credentials', 'true'); // 자격 증명 허용
    }    
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});



exports.api = functions.https.onRequest(app);
