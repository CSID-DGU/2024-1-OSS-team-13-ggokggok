import { styled } from "styled-components";
import logo from "../../others/img/logo-icon.png"


const Title = styled.h1`
font-size: 35px;
justify-content: center;
display: flex;
margin-left: -10px;
padding-rigth: 20px;
align-items: center;
`;

const LogoImage = styled.img`
  width: 45px; 
  height: auto; 
  margin-left: 0px;
`;

const WriteBtn = styled.button`
  position: absolute;
  right: 45px;
  border: none;
  background-color: white;
  color: #A3CCAA;
  font-size: 16px;
  font-weight: bold;
`;


const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 95%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;
`;

const ContentBox2 = styled.div`
  height: 143px;
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
 
  margin: 15px 0 0;

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
  
  }
`;


const ContentImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  margin: 0 10px 0 0;
`;


const UploadForm= (e)=> {
    e.preventDefault();
    navigate("/upload")
  }
  

export default function main_feed(){


    return (
        <>
            <Title>
                <LogoImage src={logo} alt="Logo" ></LogoImage>
                우리지역
                <WriteBtn onClick={UploadForm}> 글 쓰기 </WriteBtn>
            </Title>
           

            <SubTitle>
            <h2>우리지역 HOT 명소</h2>
            <ContentBox>
                
            </ContentBox>
            </SubTitle>

            
            <SubTitle>
            <h2>우리 지역 소식</h2>
              <ContentBox2>
                <div style={{display: 'flex'}}>
                    <ContentImg  src="/"></ContentImg >
                    <div>
                        <h3>맛집 기록</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <ContentImg  src="/"></ContentImg >
                    <div>
                        <h3>나만 알고 싶은 충무로 카페 발견</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <ContentImg src="/"></ContentImg>
                    <div>
                        <h3>여기 진짜 맛집인데</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
                </ContentBox2>
            </SubTitle>

        </>
    );
}
