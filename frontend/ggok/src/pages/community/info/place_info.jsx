import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton } from "../../../styles/Styles"
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

export default function Place_info(){

    const [data, setData] = useState(null);

    const {id} = useParams();


    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8000/place/post/");
          const foundData = response.data.find(item => item.id === parseInt(id)); // id를 정수로 변환하여 일치하는 데이터 찾기
          setData(foundData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, [id]); 
    return (
        <Wrapper>
          <Title>
            <div><BackButton><img src={leftlogo}/></BackButton></div>
            <TitleDiv><LogoImage src={logo} alt="Logo" /><span>우리 지역</span></TitleDiv>
          </Title>            
            <SubTitle>
            <h2>우리 지역 소식</h2>
              <ContentBox2>
                {data ? (
                    <h2>{data.title}</h2>            
                  ): (<></>)}
                </ContentBox2>
            </SubTitle>
        </Wrapper>
    );
}
