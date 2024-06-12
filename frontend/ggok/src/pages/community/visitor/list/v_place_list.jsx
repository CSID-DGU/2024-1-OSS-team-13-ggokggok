import { styled } from "styled-components";
import logo from "../../../../others/img/logo-icon.png"
import leftlogo from "../../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton } from "../../../../styles/Styles"
import { Link,useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BackButton from "../../../../components/backbutton";
import StarRating from "../../../../components/starrating";

const SubTitle = styled.h2`
  font-size: 20px;
  margin-left: 0px;
  text-align: left;
  padding: 20px 0;
`;

const ContentBox = styled.div`
  height: 143px;
  width: 90%;
  border: 1px solid #C9B6A9;
  border-radius: 10px;
  margin: 15px 0 0;
  padding: 15px;

`;

const ContentBox2 = styled.div`
  height: 550px;
  width: 100%;
  border: 1px solid #FFFFFF;
  border-radius: 10px;
  margin: 15px 0 0;
  overflow: auto;

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

const WriteBtn = styled.div`
    border: none;
    background-color: white;
    color: #A3CCAA;
    font-size: 16px;
    font-weight: bold;
`;  

export default function V_Place_list(){

    const [getData, setGetData] = useState([]);
    const {id} = useParams();
    const [secret, setSecret] = useState(false);
    const [secretData, setsecretData] = useState([]);

    async function fetchData() {
        try {
          const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${id}`);
          setGetData(response.data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }

    async function fetchSecret() {
      try {
        const response = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?secret=${id}`);
        setsecretData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

    useEffect(() => {fetchData(); fetchSecret();}, []);

    console.log(getData);

    const toggle = () => {
      setSecret(prevState => !prevState);

    };


    return (

        <Wrapper>
        <Title>
          <TitleDiv><BackButton></BackButton><LogoImage src={logo} alt="Logo" /><span>{id} 지역 명소</span></TitleDiv>
          <div><Link to ="/upload-place" style={{textDecoration: "none"}}><WriteBtn>명소 +</WriteBtn></Link></div>
        </Title>            
          <SubTitle>
          <h2></h2>
          <button onClick={toggle} type="button">{secret ? "숨겨진 명소" : "전체" }</button>
              { !secret ?
              <div style= {{ overflow: 'auto', height: '600px' }}>
              {getData.length > 0 ? (
                      getData.map((data) => (
                          <Link to={data ? `/visitor-place-info/${data.id}` : "/"}
                          style={{textDecoration: "none"}}>
                          <ContentBox>
                          <div style={{display: 'flex'}}>
                              {data.image ? 
                                <ContentImg src= {`${data.image}`}></ContentImg>
                              :
                              <></>
                              }
                              <div>
                                  <h3>{data.title}</h3>
                                  <p>{data.content}</p>
                              </div>
                          </div>
                          </ContentBox>
                          </Link>
              ))): (<h1>게시글이 없습니다</h1>)}
              </div>
            :
            <div style= {{ overflow: 'auto', height: '600px' }}>
            {secretData.length > 0 ? (
                    secretData.map((data) => (
                      <Link to={data ? `/total-info/${data.address}` : "/"}
                      style={{textDecoration: "none"}}>
                      <ContentBox>

                        <div style={{display: 'flex'}}>
                          {data.image ? 
                            <ContentImg src= {`${data.image}`}></ContentImg>
                          :
                          <></>
                          }
                            <div>
                                <h1>{data.name}</h1>
                                <br/>
                                <h1>{data.address}</h1>
                                <br />
                                </div>
                        </div>
                        </ContentBox>
                      </Link>
                ))): <h1>숨겨진 명소 데이터가 없습니다</h1>}
              </div>

            }

          </SubTitle>
        </Wrapper>
    );
}
