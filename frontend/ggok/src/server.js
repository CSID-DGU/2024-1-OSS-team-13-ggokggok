const express = require('express');
const cors = require('cors');
const app = express();

// 모든 도메인에서의 요청 허용
app.use(cors());

// 또는 특정 도메인에서의 요청 허용
// app.use(cors({
//   origin: 'http://your-allowed-domain.com'
// }));

// 이후에 라우트 설정 등을 계속 진행

// 예시 라우트
app.post('/community/post', (req, res) => {
  // 게시물 등록 로직
  res.send('Post successful');
});

app.get('/community/post', (req, res) => {
  // 게시물 가져오기 로직
  res.json([
    { name: 'Hot Spot 1', description: 'This is a hot spot.' },
    { name: 'Hot Spot 2', description: 'This is another hot spot.' },
  ]);
});

// 기타 라우트 등을 설정

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
