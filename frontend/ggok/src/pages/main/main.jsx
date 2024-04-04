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

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");



  const onSubmit = async (e) => {
    
  };

  const onChange = async (e) => {
    
  };

  return (
    
    <Wrapper>
      <Title>메인</Title>

      
    
    </Wrapper>
  );
}