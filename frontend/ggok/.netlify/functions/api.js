// functions/search.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const query = event.queryStringParameters.query;
  const api_url = `https://openapi.naver.com/v1/search/local?query=${encodeURIComponent(query)}`;

  const response = await fetch(api_url, {
    headers: {
      'X-Naver-Client-Id': 'WDVId7gO_fHzG7oRtf5w',
      'X-Naver-Client-Secret': 'q4MDc81Fjb'
    }
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ error: 'Failed to fetch data from Naver API' }),
    };
  }

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
