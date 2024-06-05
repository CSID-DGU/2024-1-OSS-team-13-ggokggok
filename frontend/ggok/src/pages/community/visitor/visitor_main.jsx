import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer } from "../../../styles/Styles"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Feed from "../../../components/feed";

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

export default function Visitor_main(){

    const [getData, setGetData] = useState([]);

    const {id} = useParams();

    const localName = id.split(' ').slice(0, 2).join(' ')

    async function fetchData() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/?region=${id}`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    const [getplace, setplace] = useState([]);

    async function fetchPlace() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${id}`);
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
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>{localName}</span></TitleDiv>
          </Title>
          
          <SubTitle>
            <Link to = {`/visitor-place-list/${localName}`} style={{ textDecoration: "none"}}><h2>{localName} 지역 HOT 명소</h2></Link>
          </SubTitle>

            <SubTitle>
            <div style= {{ overflow: 'auto', height: '200px' }}>
                {getplace.length > 0 ? (
                        getplace.map((data) => (
                          <Link to={data ? `/visitor-place-info/${data.localName}` : "/"}>
                            <ContentBox>
                            <div style={{display: 'flex'}}>
                              {data.image != null ?
                                <ContentImg src={`${data.image}`}></ContentImg>
                                : <></>
                              }
                                <div>
                                    <h3>{data.title}</h3>
                                    <p>{data.content}</p>
                                </div>
                            </div>
                            </ContentBox>
                          </Link>
                ))): (<h1>게시글이 없습니다</h1>)}
                </div>
            </SubTitle>
            
            <SubTitle>
              <Link to = {`/visitor-feed-list/${localName}`} style={{ textDecoration: "none"}}><h2>{localName} 지역 소식</h2></Link>
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
                      <Link to={data ? `/visitor-feed-info/${data.localName}` : "/"}>
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
