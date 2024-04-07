import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";


const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
  
`;

const Subtitle = styled.h2`
  text-align: center;
  color: #534340;
  margin-bottom: 200px;
`;


const Info = styled.h3`
  text-align: center;
  color: #717171;
  margin-bottom: 10px;
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



const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  text-align: center;

`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 420px;
  font-size: 16px;
  background-color: #E8E8E8;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
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

  const create_account = (e)=> {
    e.preventDefault();
    navigate("/create-account")
  }

  const login = (e)=> {
    e.preventDefault();
    navigate("/login")
  }


  return (
    <Wrapper>
    <Title>내 지역 설정</Title>
    <Subtitle>OO0님의 지역을<br /> 알려주세요</Subtitle>
    <Info>내 지역으로 등록하면 ~ <br />에 대한 서비스를 제공 받을 수 있어요</Info>
    <Button onClick={create_account}>위치 접근 권한 허용하기</Button>
    <Button onClick={login}>위치 등록 없이 사용하기</Button>
  </Wrapper>
  );
}