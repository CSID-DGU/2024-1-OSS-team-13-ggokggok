import { styled } from "styled-components";
import logo from "../../others/img/logo-icon.png"
import leftlogo from "../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer, Blank} from "../../styles/Styles"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Feed from "../../components/feed";

const SubTitle = styled.h2`
  font-size: 20px;
  margin: 5px 0px;
  text-align: left;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 90%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const PlaceContent = styled.div`
  display: flex;
  h3 {
    padding: 2px 5px;
    font-size: 17px;
    color: #534340;
  }
`;

const ContentBox2 = styled.div`
  height: 300px;
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
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

const PlaceContentImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  margin: 0 10px 10px 0;
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

export default function main_feed(){

    const [getData, setGetData] = useState([]);

    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    const region1 = user.data.region1;
    const region2 = user.data.region2;

    async function fetchData() {
        try {
          console.log(region1);
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/?region=${region1}`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const [getplace, setplace] = useState([]);

    async function fetchPlace() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${region1}`);
          setplace(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() =>{fetchData(); fetchPlace();}, []);

    console.log(getData);

    return (
        <Wrapper>
          <Title>
            <Blank/> <Blank/> <Blank/>
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
            <Blank/> <Blank/> <Blank/>
            <div><Link to ="/upload" style={{textDecoration: "none"}}><WriteBtn>글쓰기</WriteBtn></Link></div>
          </Title>
          
          <SubTitle>
            <Link to = '/place-list' style={{ textDecoration: "none"}}><h2>우리지역 HOT 명소</h2></Link>
          </SubTitle>

            <SubTitle>
            <div style= {{ overflow: 'auto', height: '200px' }}>
                {getplace.length > 0 ? (
                        getplace.map((data) => (
                          <Link to={data ? `/place-info/${data.id}` : "/"}>
                            <ContentBox>
                              <div>
                                <div style={{display: 'flex'}}>
                                {data.image != null ?
                                  <PlaceContentImg src={`${data.image}`}></PlaceContentImg>
                                  : <></>
                                }
                              </div>
                                  <PlaceContent>
                                  <svg width="20" height="20" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M85.963 80.2413C93.5123 72.6881 97.7531 62.4463 97.7531 51.7673C97.7531 41.0883 93.5123 30.8464 85.963 23.2933C82.2262 19.5539 77.7891 16.5875 72.9054 14.5637C68.0217 12.5398 62.787 11.4981 57.5005 11.4981C52.2141 11.4981 46.9794 12.5398 42.0957 14.5637C37.212 16.5875 32.7749 19.5539 29.038 23.2933C21.4888 30.8464 17.248 41.0883 17.248 51.7673C17.248 62.4463 21.4888 72.6881 29.038 80.2413L37.7838 88.8605L49.531 100.274L50.2958 100.953C54.752 104.564 61.2783 104.334 65.4758 100.274L79.477 86.6468L85.963 80.2413ZM57.5005 69C52.9256 69 48.538 67.1826 45.303 63.9476C42.068 60.7126 40.2505 56.325 40.2505 51.75C40.2505 47.175 42.068 42.7874 45.303 39.5524C48.538 36.3174 52.9256 34.5 57.5005 34.5C62.0755 34.5 66.4631 36.3174 69.6981 39.5524C72.9331 42.7874 74.7506 47.175 74.7506 51.75C74.7506 56.325 72.9331 60.7126 69.6981 63.9476C66.4631 67.1826 62.0755 69 57.5005 69Z" fill="#77605B"/>
                                  </svg>
                                      <h3>{data.name}</h3>
                                      {/* <p>{data.content}</p> */}
                                  </PlaceContent>
                           
                              </div>
                           
                            </ContentBox>
                          </Link>
                ))): (<h1>게시글이 없습니다</h1>)}
                </div>
            </SubTitle>
            
            <SubTitle>
              <Link to = '/feed-list' style={{ textDecoration: "none"}}><h2>우리 지역 소식</h2></Link>
            </SubTitle>
                {/*
                <ContentBox2>
                {getData.length > 0 ? (
                    getData.map((feed) => (
                        <Feed key={feed.id} {...feed} />
                ))): (<></>)}
                </ContentBox2>
                */}
                <SubTitle>
                <ContentBox2>
                {getData.length > 0 ? (
                    getData.map((data) => (
                      <Link to={data ? `/feed-info/${data.id}` : "/"}>
                        <div style={{display: 'flex'}}>
                              {data.image != null ?
                                <ContentImg src= {`${data.image}`}></ContentImg>
                              : <></>
                              }
                            <div>
                                <h3>{data.subject}</h3>
                                <p>{data.content}</p>
                            </div>
                        </div>
                      </Link>
                ))): (<h1>게시글이 없습니다</h1>)}
                </ContentBox2>
            </SubTitle>

        </Wrapper>
    );
}
