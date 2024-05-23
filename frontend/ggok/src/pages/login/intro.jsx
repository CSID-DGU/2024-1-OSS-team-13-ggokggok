import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Wrapper } from "../../styles/Styles";
import logo from "../../others/img/logo-icon.png"

const Title = styled.h1`
  font-size: 130px;
  color: #534340;
`;

const Subtitle = styled.h2`
  color: #534340;
  font-size: 30px;
  margin-bottom: 100px;
  line-height: 1.5;

  span {
    color: #A3CCAA;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
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



export default function Main() {
  const navigate = useNavigate();

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
      <img width="200px" src={logo}></img>
      <Subtitle><span>꼭꼭</span> 숨겨진 명소들 <br/><span>꼭꼭</span> 찾아주는 </Subtitle>
      <ButtonContainer>
        <Button onClick={create_account}>회원가입</Button>
        <Button onClick={login}>로그인하기</Button>
      </ButtonContainer>
     
    </Wrapper>
  );
}