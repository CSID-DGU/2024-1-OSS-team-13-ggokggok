import { styled } from "styled-components";
import logo from "../../others/img/logo-icon.png";
import { Wrapper, Title, LogoImage, TitleDiv, Blank } from "../../styles/Styles";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns"; // Importing date-fns function
import { ko, tr } from 'date-fns/locale'; // Importing Korean locale


const SubTitle = styled.div`
  font-size: 23px;
  margin: 20px 0px;
  text-align: left;
`;

const ContentBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: auto;
  border: 1.5px solid #C9B6A9;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  width: 120px;
  flex: 1;
  margin: 10px 5px;
  display: flex;
  flex-direction: column;
  min-width: 30%;
  align-items: center;
  text-align: center;
`;

const PlaceContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  h3 {
    padding: 2px 0px;
    font-size: 15px;
    color: #534340;
  }
`;

const ContentBox2 = styled.div`
  height: 300px; /* Fixed height to ensure scrolling */
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin: 15px 0 0;
  overflow-y: auto; /* Enable vertical scrolling */

  > div {
    font-size: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #C9B6A9;
  }

  h3 {
    color: black;
    padding: 5px 0;
  }

  p {
    font-size: 14px;
    padding: 5px 0 15px;
    width: 280px;
    height: 30px;
    white-space : nowrap;
    overflow: hidden;
    text-overflow : ellipsis;
  }
`;

const Line = styled.hr`
  width: 98%;
  border: 1px solid #C9B6A9;
`;

const PlaceContentImg = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 10px;
  margin: 0 0 5px 5px;
`;

const ContentImg = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;

const TopContent = styled.div`
  display: flex;

  div {
    width: 250px;
    font-size: 19px;
  }

  span {
    font-size: 14px;
    margin-left: auto;
    color: #BDBDBD;
  }
`;

const WriteBtn = styled.div`
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;

const NoImagePlaceholder = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 10px;
  margin: 0 10px 0 0;
  background-color: #E0E0E0; /* Gray background */
`;


const Button = styled.button`
    color: black;
    border: 4px solid green;
    border-radius: 10px;
    padding: 5px 5px;
    font-size: 17px;
    height : 30px:
    width : 100px;
`;

export default function MainFeed() {
  const [getData, setGetData] = useState([]);
  const [getplace, setplace] = useState([]);

  const [region, setregion] = useState(false);


  const session = sessionStorage.getItem('user');
  const user = JSON.parse(session);
  const region1 = user.data.region1;
  const region2 = user.data.region2;

  useEffect(() => {
    fetchData();
    fetchPlace();
  }, [region]);

  async function fetchData() {
    try {
      let search ='';
      if(region == false){
        search = region1;
      }else{
        search = region2;
      }
      response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/community/?region=${search}`);
      setGetData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchPlace() {
    try {
      let search ='';
      if(region == false){
        search = region1;
      }else{
        search = region2;
      }
      if(search != ''){
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${search}`);

        const uniquePlaces = response.data.data.filter((place, index, self) => index === self.findIndex((p) => p.name === place.name));
        setplace(uniquePlaces.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  const handleToggle = () => {
    setregion(!region);
  };

  return (
    <Wrapper>
      <Title>
        <Blank /> <Blank /> <Blank />
        <TitleDiv>
          <LogoImage src={logo} alt="Logo" />
          <span>우리 지역</span>
        </TitleDiv>
          <Blank /> <Blank /> <Blank />
        <div>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <WriteBtn>글쓰기</WriteBtn>
          </Link>
        </div>
      </Title>
          <Button onClick={handleToggle}>
          {!region 
            ? (region1 ? region1 : "등록 지역1 없음") 
            : (region2 ? region2 : "등록 지역2 없음")}          
          </Button>
      <SubTitle>
        <Link to="/place-list" style={{ textDecoration: "none" }}>
          우리지역 HOT 명소
        </Link>
      </SubTitle>

      <ContentBoxWrapper>
        {getplace.length > 0 ? (
          getplace.map((data) => (
            <Link to={data ? `/place-info/${data.id}` : "/"} key={data.id}>
              <ContentBox>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {data.image ? <PlaceContentImg src={data.image} alt={data.name} /> : null}
                  </div>
                  <PlaceContent>
                    <svg width="20" height="20" viewBox="0 0 115 115" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M85.963 80.2413C93.5123 72.6881 97.7531 62.4463 97.7531 51.7673C97.7531 41.0883 93.5123 30.8464 85.963 23.2933C82.2262 19.5539 77.7891 16.5875 72.9054 14.5637C68.0217 12.5398 62.787 11.4981 57.5005 11.4981C52.2141 11.4981 46.9794 12.5398 42.0957 14.5637C37.212 16.5875 32.7749 19.5539 29.038 23.2933C21.4888 30.8464 17.248 41.0883 17.248 51.7673C17.248 62.4463 21.4888 72.6881 29.038 80.2413L37.7838 88.8605L49.531 100.274L50.2958 100.953C54.752 104.564 61.2783 104.334 65.4758 100.274L79.477 86.6468L85.963 80.2413ZM57.5005 69C52.9256 69 48.538 67.1826 45.303 63.9476C42.068 60.7126 40.2505 56.325 40.2505 51.75C40.2505 47.175 42.068 42.7874 45.303 39.5524C48.538 36.3174 52.9256 34.5 57.5005 34.5C62.0755 34.5 66.4631 36.3174 69.6981 39.5524C72.9331 42.7874 74.7506 47.175 74.7506 51.75C74.7506 56.325 72.9331 60.7126 69.6981 63.9476C66.4631 67.1826 62.0755 69 57.5005 69Z" fill="#77605B" />
                    </svg>
                    <h3>{data.name.split(' ')[0]}</h3>
                  </PlaceContent>
                </div>
              </ContentBox>
            </Link>
          ))
        ) : (
          <h1>게시글이 없습니다</h1>
        )}
      </ContentBoxWrapper>

      <SubTitle>
        <Link to="/feed-list" style={{ textDecoration: "none" }}>
          우리 지역 소식
        </Link>
      </SubTitle>

      <SubTitle>
        <ContentBox2>
          {getData.length > 0 ? (
            getData
            .slice() // 원본 배열을 변경하지 않기 위해 복사본을 만듭니다.
            .sort((a, b) => b.id - a.id) // id를 기준으로 내림차순 정렬합니다.
            .map((data) => (
              <Link to={data ? `/feed-info/${data.id}` : "/"} key={data.id}>
                <div style={{ display: 'flex' }}>
                  {data.image ? <ContentImg src={data.image} alt={data.subject} /> : <NoImagePlaceholder />}
                  <div>
                    <TopContent>
                      <div>{data.subject}</div>
                      <span>{formatDistanceToNow(new Date(data.create_date), { addSuffix: true, locale: ko })}</span>
                    </TopContent>
                    <p>{data.content}</p>
                  </div>
                </div>
                <Line></Line>
              </Link>
            ))
          ) : (
            <h1>게시글이 없습니다</h1>
          )}
        </ContentBox2>
      </SubTitle>
    </Wrapper>
  );
}
