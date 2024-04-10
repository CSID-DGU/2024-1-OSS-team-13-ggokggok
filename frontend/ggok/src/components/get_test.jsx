import React, { useEffect, useState } from 'react';

function Get() {
  
    const [data, setData] = useState([]);

    useEffect(() => {
      // API에 요청을 보내는 함수
      const fetchData = async () => {
        try {
          // API 주소를 넣어주세요.
          const response = await fetch('api/community/post');
          // JSON 형식으로 파싱하여 데이터를 가져옵니다.
          const jsonData = await response.json();
          // 가져온 데이터를 상태 변수에 설정합니다.
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
      fetchData();
    }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정합니다.


  return (
    <div>
      {/* 배열 데이터를 출력합니다. */}
      <ul>
        {data.map(item => (
          <li key={item.post_id}>{item.post_content}</li>
        ))}
      </ul>
    </div>
  );
}

export default Get;