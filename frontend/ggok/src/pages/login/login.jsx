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

export default function Login() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [id, setid] = useState("");
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
      console.log("data", response.data);
      if (response.data.success) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        const userData = JSON.parse(sessionStorage.getItem('user'));
        if (userData.data.region1 === null && userData.data.region2 === null) {
          nav("/set-region"); 
        } else {
          nav("/");
        }
      }
 else {
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
    const { name, value } = e.target;
    if (name === "id") {
      setid(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Wrapper>
      <Title>
      <Blank/><Blank/><Blank/> <Blank/><Blank/><Blank/> <Blank/><Blank/>
        <TitleDiv>
          <LogoImage src={logo} alt="Logo" />
          <span>로그인</span>
        </TitleDiv>
      </Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="id"
          value={id}
          placeholder="아이디"
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
        <Input style={{backgroundColor: "#A3CCAA"}} type="submit" value={isLoading ? "Loading..." : "로그인"} />
      </Form>
      {error !== "" && <Error>{error}</Error>}
    </Wrapper>
  );
}
