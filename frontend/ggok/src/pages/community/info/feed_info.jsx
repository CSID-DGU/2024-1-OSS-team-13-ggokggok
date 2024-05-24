import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, Blank } from "../../../styles/Styles"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 95%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;
`;

const ContentBox2 = styled.div`
  height: 550px;
  width: 100%;
  border: 1px solid #FFFFFF;
  margin: 15px 0 0;
  overflow: auto;

  > div {
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #C9B6A9;
   
  }

  h3 {
    color: black;
    padding: 5px 0;

  }

  p {
    font-size: 14px;
    padding: 5px 0 15px;
  
  }
`;


const ContentImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;

const WriteBtn = styled.div`
    border: none;
    background-color: white;
    color: #A3CCAA;
    font-size: 16px;
    font-weight: bold;
`;  


const FormContainer = styled.div`
  margin-bottom: 20px;
`;

// 입력 필드 스타일 컴포넌트
const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

// 버튼 스타일 컴포넌트
const Button = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #A3CCAA;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  `;


  const Like = styled.input`
  display: inline-block; /* 인라인 블록 요소로 설정하여 옆으로 배치됩니다. */
  padding: 10px;
  background-color: transparent;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  `;



export default function Feed_info(){

    const [data, setData] = useState(null);

    const {id} = useParams();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app//community/post/");
          const foundData = response.data.data.find(item => item.id === parseInt(id)); // id를 정수로 변환하여 일치하는 데이터 찾기
          setData(foundData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [id]); 

    function formatTimestamp(timestamp) {
      const date = new Date(timestamp);
    
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
    
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
    

    const [getData, setGetData] = useState([]);

    async function fetchData() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/comments/${parseInt(id)}/`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {fetchData();}, []);

    const [comment, setcomment] = useState([]);

    const onChange = (e) => {
      setcomment(e.target.value);
    };

    const onSubmit = async (e) => {

      e.preventDefault();
      setcomment('');

      const currentDate = new Date().toISOString();
      const postData = 
      {
            "content": comment,
          // "create_date": currentDate,
            "post": parseInt(id),
            "author": userId(),        
      };
      console.log(postData);
  
      axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/comments/${id}/`, 
      postData)
      .then(response => {
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting:', error);
      });

      
    };

    const onlike = async (e) => {
      e.preventDefault();

      axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/vote/post/${id}/`,{},
      )
      .then(response => {
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting:', error);
      });
    };


    const colike = async (coid) => {
    //  e.preventDefault();
    const sessionData = sessionStorage.getItem('user');
    const userData = JSON.parse(sessionData);

      axios.post(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/vote/comment/${coid}/`,{'author' : userData.data.id
    },
      )
      .then(response => {
        console.log('Post successful:', response.data);
      })
      .catch(error => {
        console.error('Error posting:', error);
      });
    };

    function userId() {
      const sessionData = sessionStorage.getItem('user');
      if (sessionData) {
        try {
          const userData = JSON.parse(sessionData);
          return parseInt(userData.data.id);
        } catch (error) {
          console.error('Error parsing session data:', error);
          return null;
        }
      } else {
        console.error('Session data not found.');
        return null;
      }
    }

    

    return (
        <Wrapper>
          <Title>
            <div><BackButton><img src={leftlogo}/></BackButton></div>
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>게시물</span></TitleDiv>
          </Title>            
            <SubTitle>
            <h2>우리 지역 소식</h2>
              <ContentBox2> 
                { data ? (
                  <div>
                    <h1>{data.subject}</h1><br></br>
                    <h3>{formatTimestamp(data.create_date)}</h3><br></br>       
                    <h2>{data.content}</h2> 
                  </div>   
                ): (<></>)}

                <FormContainer>
                  <form onSubmit={onlike}>
                    <Like type="submit" value={"❤️"} />
                  </form>
                </FormContainer>

                <FormContainer>
                  <form onSubmit={onSubmit}>
                    <InputField
                      required
                      maxLength={100}
                      onChange={onChange}
                      value={comment}
                      placeholder="댓글을 입력해주세요"
                    />
                    <Button type="submit" value={"등록"} />
                  </form>
                </FormContainer>
                
                {<h1>댓글</h1>}
                {getData.length > 0 ? (
                        getData.map((data) => (
                            <div style={{display: 'flex'}}>
                                <div>
                                    <h3>{data.content}</h3>
                                    <p>{formatTimestamp(data.create_date)}</p>
                                    <form onSubmit={colike(data.id)}>
                                      <Like type="submit" value={"❤️"} />
                                    </form>
                                </div>
                            </div>
                    ))): (<></>)}
                    
                </ContentBox2>
            </SubTitle>
        </Wrapper>
    );
}
