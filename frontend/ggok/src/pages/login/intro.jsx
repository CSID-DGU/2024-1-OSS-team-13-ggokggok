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
  font-family: "GeekbleMalang2TTF";
}
  

`;



const Title = styled.h1`
  font-size: 130px;
  @font-face {
    font-family: "GeekbleMalang2TTF";
    src: local('../font/GeekbleMalang2TTF.ttf');
    font-weight: 400;
  }
  color: #534340;
 
`;

const Subtitle = styled.h2`
  color: #534340;
  margin-bottom: 200px;
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
    &[type="submit"] {
    cursor: pointer;
    &:hover {
        opacity: 0.8;
    }
`;

const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;


export default function Main() {
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
      <Title>꼭꼭</Title>
      <Subtitle>서브타이틀 및 로고</Subtitle>
      <Button onClick={create_account}>회원가입</Button>
      <Button onClick={login}>로그인하기</Button>
    </Wrapper>
  );
}