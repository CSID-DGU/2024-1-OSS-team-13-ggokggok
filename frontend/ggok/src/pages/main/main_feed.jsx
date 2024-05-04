import { styled } from "styled-components";
import logo from "../../others/img/logo-icon.png"
import leftlogo from "../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton } from "../../styles/Styles"
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Feed from "../../components/feed";

const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 90%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;
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

    async function fetchData() {
        try {
          const response = await axios.get('http://localhost:8000/community/post/');
          setGetData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const [getplace, setplace] = useState([]);

    async function fetchPlace() {
        try {
          const response = await axios.get('http://localhost:8000/place/post/');
          setplace(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    useEffect(() =>{fetchData(); fetchPlace();}, []);

    console.log(getData);

    return (
        <Wrapper>
          <Title>
            <div><BackButton><img src={leftlogo}/></BackButton></div>
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
            <div><Link to ="/upload" style={{textDecoration: "none"}}><WriteBtn>글쓰기</WriteBtn></Link></div>
          </Title>
            <SubTitle>
            <Link to = '/place-list'><h2>우리지역 HOT 명소</h2></Link>
            <div style= {{ overflow: 'auto', height: '200px' }}>
                {getplace.length > 0 ? (
                        getplace.map((data) => (
                            <ContentBox>
                            <div style={{display: 'flex'}}>
                                <ContentImg src="/"></ContentImg>
                                <div>
                                    <h3>{data.title}</h3>
                                    <p>{data.content}</p>
                                </div>
                            </div>
                            </ContentBox>
                ))): (<></>)}
                </div>
            </SubTitle>

            
            <SubTitle>
            <Link to = '/feed-list' ><h2>우리 지역 소식</h2></Link>
                {/*
                <ContentBox2>
                {getData.length > 0 ? (
                    getData.map((feed) => (
                        <Feed key={feed.id} {...feed} />
                ))): (<></>)}
                </ContentBox2>
                */}
                <ContentBox2>
                {getData.length > 0 ? (
                    getData.map((data) => (
                        <div style={{display: 'flex'}}>
                            <ContentImg src="/"></ContentImg>
                            <div>
                                <h3>{data.subject}</h3>
                                <p>{data.content}</p>
                            </div>
                        </div>
                ))): (<></>)}
                </ContentBox2>
            </SubTitle>

        </Wrapper>
    );
}
