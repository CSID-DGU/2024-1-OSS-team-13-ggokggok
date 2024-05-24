import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../..//others/img/logo-icon.png";
import { Title, Wrapper, Blank, TitleDiv, LogoImage } from "../../styles/Styles";
import axios from "axios";


const Form = styled.form`
  align-items: center;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  text-align: center;
`;

const Input = styled.input`
  padding: 0px 20px;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  height: 50px;
  width: 303px;
  font-size: 16px;
  background-color: #F6F6F6;

  &[type="submit"] {
    width: 343px;
    height: 51px;
    cursor: pointer;
    border-radius: 50px;
    color: white;
    margin-top: 330px;
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
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (id === "" || password === "" || isLoading) return;

    const postData = {
      username: id,
      password: password,
    };

    setLoading(true);
    try {
      const response = await axios.post(
        "https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/login/",
        postData
      );
      console.log("data");
      if (response.data.success) {
        sessionStorage.clear();
        sessionStorage.setItem("user", JSON.stringify(response.data));
        nav("/");
      } else {
        setError("로그인 실패. 아이디와 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
  
    if (name === "email") { // name이 "email"인 경우에만 setEmail 호출
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  

  return (
    <Wrapper>
      
      <Title>
        <Blank/><Blank/><Blank/>
          <TitleDiv>
          <LogoImage src={logo} alt="Logo" />
            <span>로그인</span>
          </TitleDiv>
      </Title>

      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="이메일"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          value={password}
          name="password"
          placeholder="비밀번호"
          type="password"
          required
        />
        
        <Link to = "/create-account" style={{ textDecoration: "none"}}><div color="A3CCAA">회원이 아니신가요?</div></Link>
        <Input style={{backgroundColor: "#A3CCAA"}} type="submit" value={isLoading ? "Loading..." : "로그인"} />
        
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
