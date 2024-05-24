import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Title, TitleDiv, LogoImage, Blank } from "../../styles/Styles";


// 초기 프로필 상태 정의
const initialProfileState = {
  username: "",
  region1: "",
  region2: "",
};

// 프로필 정보를 가져오는 함수
const fetchProfileInfo = async () => {
  try {
    const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?myuser=1`);
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
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 20px;
  background-color: #eaf4ec;
  padding: 15px;
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
  border-radius: 10px;
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
    font-size: 14px;
    padding: 5px 0 15px;
  }
`;

const ContentImg = styled.img`
  width: 95%;
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;

const MyPage = () => {
  const [profile, setProfile] = useState(initialProfileState);
  const [selectedButton, setSelectedButton] = useState("my-posts");
  const [posts, setPosts] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const navigate = useNavigate();

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
  }, [selectedButton]);

  const fetchMyPosts = async () => {
    try {
      const response = await axios.get("https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?community=1");
      setPosts(response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchMyRoadmap = async () => {
    try {
      const response = await axios.get("https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/user/?place=1");
      setRoadmap(response.data.data);
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

  return (
    <>
      <Title>
        <Blank></Blank>
        <TitleDiv>
          <span>마이페이지</span>
        </TitleDiv>
        <div>
          <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
        </div>
      </Title>

      <ProfileWrapper>
        <ProfileImage src={profile.profileImage} alt="Profile" />
        <UserInfoWrapper>
          <ResidentInfo>{profile.region1} 주민</ResidentInfo>
          <UserName>{profile.username}</UserName>
        </UserInfoWrapper>
      </ProfileWrapper>

      <ButtonContainer>
        <SlidingButton
          active={selectedButton === "my-posts"}
          onClick={() => handleButtonClick("my-posts")}
        >
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
        {selectedButton === "my-posts" && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.id} to={`/feed-info/${post.id}`}>
              <div style={{ display: "flex" }}>
                <ContentImg src="/" alt="content" />
                <div>
                  <h3>{post.subject}</h3>
                  <p>{post.content}</p>
                </div>
              </div>
            </Link>
          ))
        ) : selectedButton === "my-roadmap" && roadmap.length > 0 ? (
          roadmap.map((place) => (
            <Link key={place.id} to={`/place-info/${place.id}`}>
              <div style={{ display: "flex" }}>
                <ContentImg src="/" alt="content" />
                <div>
                  <h3>{place.name}</h3>
                  <p>{place.content}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>게시물이 없습니다.</p>
        )}
      </ContentBox2>
    </>
  );
};

export default MyPage;
