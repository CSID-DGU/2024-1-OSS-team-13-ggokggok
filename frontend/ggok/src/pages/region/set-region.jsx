import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 55px 0px;
`;

const Title = styled.h1`
  font-size: 30px;
  color: #534340;
  
`;

const Subtitle = styled.h2`
  text-align: center;
  color: #534340;
  margin-bottom: 70px;
`;


const SVGImage = (
  <svg width="140" height="140" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M85.963 80.2413C93.5123 72.6881 97.7531 62.4463 97.7531 51.7673C97.7531 41.0883 93.5123 30.8464 85.963 23.2933C82.2262 19.5539 77.7891 16.5875 72.9054 14.5637C68.0217 12.5398 62.787 11.4981 57.5005 11.4981C52.2141 11.4981 46.9794 12.5398 42.0957 14.5637C37.212 16.5875 32.7749 19.5539 29.038 23.2933C21.4888 30.8464 17.248 41.0883 17.248 51.7673C17.248 62.4463 21.4888 72.6881 29.038 80.2413L37.7838 88.8605L49.531 100.274L50.2958 100.953C54.752 104.564 61.2783 104.334 65.4758 100.274L79.477 86.6468L85.963 80.2413ZM57.5005 69C52.9256 69 48.538 67.1826 45.303 63.9476C42.068 60.7126 40.2505 56.325 40.2505 51.75C40.2505 47.175 42.068 42.7874 45.303 39.5524C48.538 36.3174 52.9256 34.5 57.5005 34.5C62.0755 34.5 66.4631 36.3174 69.6981 39.5524C72.9331 42.7874 74.7506 47.175 74.7506 51.75C74.7506 56.325 72.9331 60.7126 69.6981 63.9476C66.4631 67.1826 62.0755 69 57.5005 69Z" fill="#77605B"/>
  </svg>
);

const Info = styled.h3`
  text-align: center;
  color: #717171;
  margin: 90px 0px; 
`;



const Button = styled.button`
    height: 46px;
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    margin: 10px;
    width: 315px;
    font-size: 17px;
    background-color : #A3CCAA;
    color: #FFFFFF;
   
`;



const Button2 = styled.button`
    height: 46px;
    padding: 10px 20px;
    border-radius: 50px;
    border: 2px solid #A3CCAA;
    margin: 10px;
    width: 315px;
    font-size: 17px;
    color : #A3CCAA;
    background-color: #FFFFFF;
   
`;

export default function SetRegion() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const onSubmit = async (e) => {
    
  };

  const onChange = async (e) => {
    
  };

  const search_region = (e)=> {
    e.preventDefault();
    navigate("/search-region")
  }

  const main = (e)=> {
    e.preventDefault();
    navigate("/")
  }


  return (
    <Wrapper>
    <Title>내 지역 설정</Title>
    <Subtitle>OO0님의 지역을 <br /> 알려주세요</Subtitle>
    {SVGImage}
    <Info>내 지역으로 등록하면 ~ <br />에 대한 서비스를 제공 받을 수 있어요</Info>
    <Button onClick={search_region}>내 지역 등록하기</Button>
    <Button2 onClick={main}>위치 등록 없이 사용하기</Button2>
    </Wrapper>
  );
}