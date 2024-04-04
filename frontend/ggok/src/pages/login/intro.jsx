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
  font-size: 50px;
  @font-face {
    font-family: "GeekbleMalang2";
    src: local('../font/GeekbleMalang2');
    font-weight: 400;
  }
  color: #534340;
`;

const Subtitle = styled.h2`
  color: #534340;

`;

const Button = styled.button`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    margin: 10px;
    width: 100%;
    font-size: 16px;
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

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
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
    navigate("/create_account")
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