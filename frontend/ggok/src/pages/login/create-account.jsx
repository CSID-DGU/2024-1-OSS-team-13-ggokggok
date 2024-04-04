import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
  
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

export const Input = styled.input`
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
  background-color: #E8E8E8;

`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d9bf0;
  }
`;

export default function CreateAccount(){
    const nav = useNavigate();
    const [isLoading,setLoading]= useState(false);

    const [name,setName] = useState("");
    const [nickname, setNick] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error, setError] = useState("");

    const onChange = (e) => {
        const {
            target: {name, value},
        } = e;

        if(name === "name"){
            setName(value);
        }else if(name === "email"){
            setEmail(value);
        }else if(name === "password"){
            setPassword(value);
        }else if(name == "nick"){
            setNick(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if(name === "" || email==="" || password === "" || isLoading) return;

        try {
            setLoading(true);
            //회원가입
            nav("/");

        } catch (e) {
            //에러처리
        } finally {
          setLoading(false);
        }
       
    };

    return(
        <Wrapper>
            <Title>회원가입</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" value = {name} onChange={onChange} placeholder="본명" type="text" required/>
                <Input name="nick" value={nickname} onChange={onChange} placeholder="닉네임" type="text" required/>
                <Input name="email" value={email} onChange={onChange} placeholder="이메일" type="email" required/>
                <Input name="password" value={password} onChange={onChange} placeholder="비밀번호" type="password" required/>
                <Input style={{backgroundColor: "#A3CCAA"}} type="submit" value= "회원가입" />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
        </Wrapper>

    );
}