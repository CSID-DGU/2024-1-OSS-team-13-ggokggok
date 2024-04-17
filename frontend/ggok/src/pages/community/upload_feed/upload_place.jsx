import { useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, BackButton, MainContainer } from "../../../styles/Styles";

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



const Icon = styled.div`
  display: flex;
  

`;

const LocArea =styled.input`
    width: 200px;
    height: 30px;
    border: none;
    outline: none; 
    margin-bottom: 5px;

    &::placeholder {
      font-size: 20px;
      font-family: "laundryR";
      color: #717171;
    }
`;

const TextArea = styled.textarea`
  border: none;
  resize: none;
  
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

export default function upload_place() {
  const [isLoading, setLoading] = useState(false);
  
  const [sub, setsub] = useState("");
  const [text, settext] = useState("");
  const [place, setplace] = useState("");

  
  const [file, setFile] = useState(null);
  
  const onChange = (e) => {
    settext(e.target.value);
  };

  const onSub = (e) => {
    setsub(e.target.value);
  };

  const onPlace = (e) => {
    setplace(e.target.value);
  };


  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1 && files[0].size < 1024*1024) {
      setFile(files[0]);
    }else{
        alert(`Please select one file that is 1MB or less.`);
    }
  };
  



  const onSubmit = async (e) => {
    e.preventDefault();
    
    const currentDate = new Date().toISOString();
    const postData = {
        "subject": sub,
        "content": text,
        "create_date": currentDate,
        "post_region": place,
        "modify_date": currentDate,
        "author": 0,
        "voter": [
          0
        ]
    };
    console.log(postData);

    axios.post('http://localhost:8000/api/community/post/', postData)
    .then(response => {
      console.log('Post successful:', response.data);
    })
    .catch(error => {
      console.error('Error posting:', error);
    });
  };

  return (
    <>
      <Title>
        <div><BackButton><img src={leftlogo}/></BackButton></div>
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>명소 등록</span></TitleDiv>
       
      </Title>
       
        <Form onSubmit={onSubmit}>
           <SubArea
           required
           maxLength={10}
           onChange={onSub}
           value={sub}
           placeholder="제목"
           />
      
           <Icon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA"/>
              </svg>
              <LocArea
                required
                maxLength={10}
                onChange={onPlace}
                value={place}
                placeholder="우리 지역 명소 등록"
              />
            </Icon>


            <SubArea
           required
           maxLength={10}
           onChange={onPlace}
           value={place}
           placeholder="명소 주소를 입력해주세요!"
           />
           
           <div style={{display: 'flex'}}>
            <button onClick={toggle} type="button">{ispublic ? "공개" : "비공개" }</button>
            <StarRating 
            totalStars={5} 
            selectedStars={stars}
            onStarClick={setstars}
            />
          </div>
          
      
           
            <TextArea
            required
            rows={5}
            maxLength={180}
            onChange={onChange}
            value={text}
            placeholder="장소에 대한 솔직한 글을 작성해주세요!"
            />
            <AttachFileButton htmlFor="file">
            {file ? "Photo added ✅" : "Add photo"}
            </AttachFileButton>
            <AttachFileInput
            onChange={onFileChange}
            type="file"
            id="file"
            accept="image/*"
            />
            <SubmitBtn
            type="submit"
            value={isLoading ? "Posting..." : "Post text"}
            />
        </Form>
    </>
  );
}