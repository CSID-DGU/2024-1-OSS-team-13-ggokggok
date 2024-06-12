import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LogoImage, Blank, ExtraButton, Wrapper } from "../../styles/Styles";
import logo from "../../others/img/logo-icon.png";
import profileImage from "../../others/img/profile.png";
import { formatDistanceToNow } from "date-fns"; // Importing date-fns function
import { ko } from 'date-fns/locale'; // Importing Korean locale


const TitleDiv = styled.div`
  // width: 80%;
  align-items: center;
  text-align: center;
  display: flex;
  span { margin-left: 28px; }
  div { padding-left: 34px}
  img { margin-bottom: -7px; }
  font-size: 25px;
`;

// 초기 프로필 상태 정의
const initialProfileState = {
  username: "",
  region1: "",
  region2: "",
  profileImage: "", // 프로필 이미지 추가
};

// 프로필 정보를 가져오는 함수
const fetchProfileInfo = async () => {
  try {
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const userId = userData ? userData.data.id : null;
    
    if (!userId) return null; // userId가 없으면 요청하지 않음

    const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?myuser=${userId}`);
    return response.data.data[0]; // API 응답 데이터에서 첫 번째 객체를 반환
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return null;
  }
};

const LogoutBtn = styled.div`
  border: none;
  background-color: white;
  color: #a3ccaa;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 40px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 20px;
  background-color: #eaf4ec;
  padding: 15px;
  position: relative; // 위치 설정을 위해 추가
`;

export const Title = styled.h1`
  width: 90%;
  display: flex;
  font-size: 29px;
  align-items: center;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  background-color: white;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResidentInfo = styled.div`
  margin-bottom: 10px;
  font-size: 23px;
`;

const UserName = styled.div`
  font-size: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0;
  background-color: #f6f6f6;
  border-radius: 20px;
  overflow: hidden;
`;

const SlidingButton = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.3s ease;
  background-color: ${({ active }) => (active ? "#534340" : "#f6f6f6")};
  color: ${({ active }) => (active ? "#ffffff" : "#e8e8e8")};

  &:hover {
    background-color: ${({ active }) => (active ? "#534340" : "#f0f0f0")};
  }
`;

const ContentBox2 = styled.div`
  height: 300px;
  width: 95%;
  border: 1px solid #ffffff;
  margin: 15px 0 0;
  overflow: auto;

  > div {
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #c9b6a9;
  }

  h3 {
    color: black;
    padding: 5px 0;
  }

  p {
    width: 300px;
    height: 30px;
    text-align: left;
    font-size: 14px;
    padding: 5px 0 15px;
    white-space : nowrap;
    overflow: hidden;
    text-overflow : ellipsis;
  }
`;

const ContentImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow:hidden;
  object-fit: cover;
padding: 5px 1px;
`;

const EditRegionButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #A3CCAA;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #89b492;
  }
`;

const NoImagePlaceholder = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  background-color: #E0E0E0; /* Gray background */
`;

const TopContent = styled.div`
  display: flex;

  div {
    width: 230px;
    text-align: left;
  }

  span {
    font-size: 13px;
    margin-left: auto;
    color: #BDBDBD;
  }
`;

const MyPage = () => {
  const [profile, setProfile] = useState(initialProfileState);
  const [selectedButton, setSelectedButton] = useState("my-posts");
  const [contents, setContents] = useState([]);
  const navigate = useNavigate();

  // 세션에서 사용자 데이터 가져오기
  const userData = JSON.parse(sessionStorage.getItem('user'));
  const userId = userData ? userData.data.id : null;

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await fetchProfileInfo();
      if (profileData) {
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedButton === "my-posts") {
      fetchMyPosts();
    } else if (selectedButton === "my-roadmap") {
      fetchMyRoadmap();
    }
  }, [selectedButton, userId]);

  const fetchMyPosts = async () => {
    try {
      if (!userId) return; // userId가 없으면 요청하지 않음
      const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?community=${userId}`);
      setContents(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchMyRoadmap = async () => {
    try {
      if (!userId) return; // userId가 없으면 요청하지 않음
      const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?place=${userId}`);
      console.log(response.data); // 응답 데이터를 콘솔에 출력
      setContents(response.data.data);
    } catch (error) {
      console.error("Error fetching roadmap:", error);
    }
  };
  
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleLogout = () => {
    // 세션의 모든 값을 지우기 위해 로컬 스토리지를 비움
    sessionStorage.clear();
    // /intro 페이지로 리다이렉트
    navigate("/intro");
  };

  const handleEditRegion = () => {
    // 지역 정보 수정 페이지로 이동
    navigate("/info-region");
  };
  const userInfo = () => {
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    return user.data;
  }
  return (
    <Wrapper>
      <Title> 
        <Blank/><Blank/>
        <TitleDiv> &nbsp; &nbsp; <LogoImage src={logo} alt="Logo" /><span>마이페이지</span>
        </TitleDiv>    
        <ExtraButton>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </ExtraButton>
      </Title>

      <ProfileWrapper>
        <ProfileImage src={profileImage || "https://i.namu.wiki/i/zw-3hri_NINFShw4KfHezUemGvkhgHMYjfuXpYx7PhcOcpPdZCSaWK_H9HNAKm99TrALzQ_3XCmJGwpYQUX_vJ5tnZ-Am9gvK2CGNBNOQn-UNfV-NLwOn_RaaOtIQKLQ0X1Ql8hpM0SuhkyErHBhfw.webp"} alt="Profile" />
        <UserInfoWrapper>
          <UserName>{ userInfo() ? userInfo().username :  null}</UserName>
        </UserInfoWrapper>
        <EditRegionButton onClick={handleEditRegion}>지역 정보 관리</EditRegionButton>
      </ProfileWrapper>

      <ButtonContainer>
        <SlidingButton active={selectedButton === "my-posts"} onClick={() => handleButtonClick("my-posts")}>
          내 게시물
        </SlidingButton>
        <SlidingButton
          active={selectedButton === "my-roadmap"}
          onClick={() => handleButtonClick("my-roadmap")}
        >
          내 명소 게시물
        </SlidingButton>
      </ButtonContainer>

      <ContentBox2>
        {contents.length > 0 ? (
          contents.map((content) => (
            <Link key={content.id} to={selectedButton === "my-posts" ? `/feed-info/${content.id}` : `/place-info/${content.id}`}>
              <div style={{ display: "flex" }}>

                {content.image ? <ContentImg src={content.image} alt={content.subject} /> : <NoImagePlaceholder/>}
                <div>
                    <TopContent>
                      <div>{content.subject}</div>
                      <span>{formatDistanceToNow(new Date(content.create_date), { addSuffix: true, locale: ko })}</span>
                    </TopContent>
                    <p>{content.content}</p>
                  </div>
              </div>
            </Link>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </ContentBox2>
    </Wrapper>
  );
};

export default MyPage;
