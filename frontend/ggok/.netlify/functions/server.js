// functions/server.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;

  const response = await fetch(`https://openapi.naver.com/v1/search/local?query=${encodeURIComponent(query)}`, {
    headers: {
      'X-Naver-Client-Id': 'WDVId7gO_fHzG7oRtf5w',
      'X-Naver-Client-Secret': 'q4MDc81Fjb',
    },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
