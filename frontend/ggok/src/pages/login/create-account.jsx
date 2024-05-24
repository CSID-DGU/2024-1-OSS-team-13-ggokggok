import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
    margin-top: 350px;
    &:hover {
      opacity: 0.8;
    }
  }
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

export default function CreateAccount() {
  const nav = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "id") {
      setId(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

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
        "https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/join/",
        postData
      );
      console.log("data");
      console.log(response);
      if (response.data.success) {
        nav("/");
      } else {
        setError("회원가입 실패. 아이디와 비밀번호를 확인하세요.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>


<Title>
        <Blank/><Blank/><Blank/>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>회원가입</span></TitleDiv>

      </Title>
      {!isLoading ? (
        <Form onSubmit={onSubmit}>
          <Input
            name="id"
            value={id}
            onChange={onChange}
            placeholder="이메일"
            type="text"
            required
          />
          <Input
            name="password"
            value={password}
            onChange={onChange}
            placeholder="비밀번호"
            type="password"
            required
          />
          <Input
            style={{ backgroundColor: "#A3CCAA" }}
            type="submit"
            value="회원가입"
          />
        </Form>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "30px",
          }}
        >
          <h1>Loading...</h1>
        </div>
      )}
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}

