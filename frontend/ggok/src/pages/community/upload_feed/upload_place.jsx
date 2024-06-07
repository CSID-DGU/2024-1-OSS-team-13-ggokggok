import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../../../others/img/logo-icon.png';
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton, MainContainer, Blank } from '../../../styles/Styles';
import StarRating from '../../../components/starrating';
import BackButton from '../../../components/backbutton';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 90%;
  flex-grow: 1;
  justify-content: space-between; /* Form 안의 내용과 버튼 영역을 위아래로 배치 */
`;

const SubArea = styled.input`
  height: 50px;
  border: none;
  border-bottom: 2px solid #E8E8E8;
  outline: none;
  margin-bottom: 10px;
  margin-top: 30px;
  font-size: 30px;
  font-family: "TTLaundryGothicB";

  &::placeholder {
    font-size: 30px;
    font-family: "TTLaundryGothicB";
    color: #959595;
  }
`;

const Icon = styled.div`
  display: flex;
`;

const LocArea = styled.button`
  height: 40px;
  border: none;
  background-color: white;
  margin-bottom: 5px;
  font-size: 20px;
  color: black;
  padding-bottom: 30px;
  font-family: "TTLaundryGothicB";
`;

const TextArea = styled.textarea`
  border: none;
  resize: none;
  font-size: 20px;
  height: 230px;
  overflow-y: auto;
  font-family: "TTLaundryGothicB";

  &::placeholder {
    font-size: 20px;
    font-family: "TTLaundryGothicB";
    color: #959595;
  }

  &:focus {
    font-size: 20px;
    font-family: "TTLaundryGothicB";
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

const CurrentImage = styled.img`
  max-width: 80%;
  margin: auto;
  height: auto;
  margin-bottom: 10px;
`;


const CancleButton = styled.button`
  padding: 10px 0px;
  color: #A3CCAA;
  text-align: center;
  border-radius: 20px;
  border: 2px solid #A3CCAA;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;


const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;

`;

export default function UploadPlace({ post, onSave, onCancel }) {
  const { id } = useParams();
  const [sub, setSub] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [add, setAddress] = useState('');
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [currentImage, setCurrentImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [stars, setStars] = useState(0);

  const navigate = useNavigate();

  const toggle = () => {
    setIsPublic(prevState => !prevState);
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const handleCancel = () => {
    // onCancel 함수가 있는 경우 해당 함수를 호출합니다.
    if (onCancel) onCancel();
    // 뒤로 돌아가는 기능을 추가합니다.
    navigate(-1);
  };

  const onSub = (e) => {
    setSub(e.target.value);
  };

  const onFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length === 1 && files[0].size < 1024 * 1024) {
      setFile(files[0]);
    } else {
      alert(`Please select one file that is 1MB or less.`);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      if (id) {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${id}/`);
          const postData = response.data.data;
          setSub(postData.subject);
          setText(postData.content);
          setIsPublic(postData.public);
          setName(postData.name);
          setStars(postData.review);
          setLat(postData.lat);
          setLong(postData.long);
          setAddress(postData.address);
          setCurrentImage(postData.image);
        } catch (error) {
          console.error('Error fetching post data:', error);
        }
      }
    };

    // sessionStorage에서 placeName 값 불러오기
    const storedName = sessionStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
    const storedAdd = sessionStorage.getItem('add');
    if (storedAdd) {
      setAddress(storedAdd);
    }
    const storedLat = sessionStorage.getItem('lat');
    if (storedLat) {
      setLat(storedLat);
    }
    const storedLong = sessionStorage.getItem('long');
    if (storedLong) {
      setLong(storedLong);
    }
    const storedPub = sessionStorage.getItem('pub');
    if (storedPub) {
      setIsPublic(storedPub === 'true');
    }
    const storedStar = sessionStorage.getItem('star');
    if (storedStar) {
      setStars(parseInt(storedStar));
    }
    const storedSub = sessionStorage.getItem('sub');
    if (storedSub) {
      setSub(storedSub);
    }
    const storedText = sessionStorage.getItem('text');
    if (storedText) {
      setText(storedText);
    }

    fetchPostData();
  }, [id]);

  const handleButtonClick = () => {
    const destination = '/search-place';
    sessionStorage.setItem('sub', sub);
    sessionStorage.setItem('text', text);
    sessionStorage.setItem('star', stars);
    sessionStorage.setItem('pub', isPublic);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('lat', lat);
    sessionStorage.setItem('long', long);
    navigate(destination);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 기본 데이터
    const data = {
      subject: sub,
      content: text,
      author: userId(),
      public: isPublic,
      review: stars,
      category: "cafe",
      name: name,
      address: add,
      lat: lat,
      long: long,
    };
  
    // 데이터 유효성 검사
    if (!data.subject || !data.content || !data.author || !data.review || !data.lat || !data.long) {
      alert('All fields are required!');
      console.error('Validation Error:', data);
      return;
    }
  
    // 파일 업로드가 필요한 경우
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        // 파일 업로드 API 호출 (서버의 파일 업로드 엔드포인트를 사용)
        const uploadResponse = await axios.post('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        data.image = uploadResponse.data.imageUrl; // 업로드된 파일의 URL을 데이터에 추가
      } catch (error) {
        console.error('Error uploading file:', error);
        return;
      }
    }
  
    console.log('Data to be submitted:', data);
  
    try {
      let response;
      if (id) {
        // JSON 데이터로 PUT 요청
        response = await axios.put(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/${id}/`, data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // JSON 데이터로 POST 요청
        response = await axios.post('https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/post/', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        alert('등록이 완료되었습니다!');
        navigate(`/`);
      }
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error uploading data:', error);
    }
  
    // 저장 후 sessionStorage 초기화
    setSub("");
    setText("");
    setFile(null);
    setIsPublic(true);
    setStars(0);
    setCurrentImage(null);
    setName('');
    setAddress('');
    setLat(0);
    setLong(0);
    sessionStorage.clear();
  
    if (onSave) onSave();
    if (id) {
      alert('수정이 완료되었습니다!');
      navigate(`/`);

    }
  };
  
  
  // 사용자의 ID를 세션에서 가져오는 함수
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
      <BackButton></BackButton><Blank /><Blank /><Blank />
        <TitleDiv><LogoImage src={logo} alt="Logo" /><span>명소 등록</span></TitleDiv>
        <Blank /><Blank />
        <ExtraButton onClick={toggle} type="button">{isPublic ? '공개' : '비공개'}</ExtraButton>
      </Title>

      <Form onSubmit={handleSubmit}>
        <SubArea
          required
          maxLength={10}
          onChange={onSub}
          value={sub}
          placeholder="제목"
        />

        <Icon>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.4443 15.3505C17.8885 13.9056 18.6998 11.9462 18.6998 9.90331C18.6998 7.86038 17.8885 5.90106 16.4443 4.45611C15.7294 3.74076 14.8806 3.17328 13.9463 2.7861C13.012 2.39893 12.0106 2.19965 10.9993 2.19965C9.98798 2.19965 8.98657 2.39893 8.05229 2.7861C7.11801 3.17328 6.26918 3.74076 5.55431 4.45611C4.11011 5.90106 3.29883 7.86038 3.29883 9.90331C3.29883 11.9462 4.11011 13.9056 5.55431 15.3505L7.22741 16.9994L9.47471 19.1829L9.62101 19.3127C10.4735 20.0035 11.722 19.9595 12.525 19.1829L15.2035 16.5759L16.4443 15.3505ZM10.9993 13.2C10.1241 13.2 9.28472 12.8523 8.66585 12.2335C8.04698 11.6146 7.69931 10.7752 7.69931 9.90001C7.69931 9.0248 8.04698 8.18543 8.66585 7.56656C9.28472 6.94769 10.1241 6.60001 10.9993 6.60001C11.8745 6.60001 12.7139 6.94769 13.3328 7.56656C13.9516 8.18543 14.2993 9.0248 14.2993 9.90001C14.2993 10.7752 13.9516 11.6146 13.3328 12.2335C12.7139 12.8523 11.8745 13.2 10.9993 13.2Z" fill="#A3CCAA" />
          </svg>
          {name ? (
            <LocArea onClick={handleButtonClick} type="button">{name}</LocArea>
          ) : (
            <LocArea onClick={handleButtonClick} type="button">
              명소 검색하기 🔍
            </LocArea>
          )}
        </Icon>

        <TextArea
          required
          rows={5}
          maxLength={180}
          onChange={onChange}
          value={text}
          placeholder="장소에 대한 솔직한 글을 작성해주세요!"
        />

        {currentImage && <CurrentImage src={currentImage} alt="Current" />}
        <div style={{ marginLeft: 'auto' }}>
          <StarRating
            totalStars={5}
            selectedStars={stars}
            onStarClick={setStars}
          />
        </div>

        <ButtonContainer>
          <AttachFileButton htmlFor="file">
            {file ? '사진 추가 완료! ✅' : '사진 첨부'}
          </AttachFileButton>
          <AttachFileInput
            onChange={onFileChange}
            type="file"
            id="file"
            accept="image/*"
          />
          <SubmitBtn
            type="submit"
            value="게시글 등록"
          />
          <CancleButton onClick={handleCancel}>Cancel</CancleButton>
        </ButtonContainer>
        
      </Form>
     
    </Wrapper>
  );
}
