import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer, Blank } from "../../../styles/Styles";


// 스타일 정의
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 90%;
`;

const SubArea = styled.input`
  height: 50px;
  border: none;
  border-bottom: 2px solid #E8E8E8;
  outline: none; 
  margin-bottom: 10px;
  margin-top: 30px;

  &::placeholder {
    font-size: 32px;
    font-family: "laundryR";
    color: #959595;
  }
`;

const TextArea = styled.textarea`
  border: none;
  width: 90%;
  resize: none;
  font-size: 20px;

  &::placeholder {
    font-size: 20px;
    font-family: "laundryR";
    color: #959595;
  }

  &:focus {
    font-size: 20px;
    font-family: "laundryR";
    outline: none;
    border-color: #A3CCAA;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #A3CCAA;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #A3CCAA;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #A3CCAA;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;


axios.defaults.withCredentials = true;

export default function Upload() {


  const [isLoading, setLoading] = useState(false);
  const [sub, setSub] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSub = (e) => {
    setSub(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1 && files[0].size < 1024 * 1024) {
      setFile(files[0]);
    } else {
      alert('Please select one file that is 1MB or less.');
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    /*
    setSub("");
    setText("");
    setFile(null);
    const currentDate = new Date().toISOString();
    const postData = {
      subject: sub,
      content: text,
      // create_date: currentDate,
      post_region: "string",
      author: userId(),
      image : null,
    };



    try {
      const response = await axios.post(
        'https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/',
        postData,

        
      );
      console.log(postData);
      console.log('Post successful:', response.data);
    } catch (error) {
      console.error('Error posting:', error);
    }
    */

    const formData = new FormData();
    formData.append('image', file);
    formData.append('subject', sub);
    formData.append('content', text);
    formData.append('post_region', 'string');
    formData.append('author', userId());



    try {
      const response = await axios.post('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/post/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setSub("");
    setText("");
    setFile(null);


  };


  function userId() {
    const sessionData = sessionStorage.getItem('user');
    if (sessionData) {
      try {
        const userData = JSON.parse(sessionData);
        return parseInt(userData.data.id);
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    } else {
      console.error('Session data not found.');
      return null;
    }
  }

  return (
    <Wrapper>
      <Title>
        <div><BackButton><img src={leftlogo} /></BackButton></div>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>게시물 등록</span></TitleDiv>
      </Title>
      
      <Form onSubmit={onSubmit}>
        <SubArea
          required
          maxLength={10}
          onChange={onSub}
          value={sub}
          placeholder="제목"
        />
        <TextArea
          required
          rows={5}
          maxLength={180}
          onChange={onChange}
          value={text}
          placeholder="자유롭게 게시물을 등록해주세요!"
        />
        <AttachFileButton htmlFor="file">
          {file ? "사진 추가 완료! ✅" : "사진 첨부"}
        </AttachFileButton>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          id="file"
          accept="image/*"
        />
        <SubmitBtn
          type="submit"
          value={isLoading ? "등록중..." : "게시글 등록!"}
        />
      </Form>
    </Wrapper>
  );
}
