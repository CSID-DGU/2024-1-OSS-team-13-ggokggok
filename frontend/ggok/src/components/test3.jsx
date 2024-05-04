import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Test3() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app//api/community/post/');
        setPostData(response.data);
        console.log(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {postData.length > 0 && (
        <div>
          <h1>{postData[0].subject}</h1>
          <p>{postData[0].content}</p>
          <h1>{postData[1].subject}</h1>
          <p>{postData[1].content}</p>
        </div>
      )}
    </div>
  );
}

export default Test3;