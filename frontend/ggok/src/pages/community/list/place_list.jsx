import { styled } from "styled-components";
import logo from "../../../others/img/logo-icon.png"
import leftlogo from "../../../others/img/left-button.png"
import { Wrapper, Title, LogoImage, TitleDiv, ExtraButton } from "../../../styles/Styles"
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import StarRating from "../../../components/starrating";
import BackButton from "../../../components/backbutton";

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

export default function Place_list(){

    const [getData, setGetData] = useState([]);
    const [secret, setSecret] = useState(false);
    const [secretData, setsecretData] = useState([]);

    const {id} = useParams();
    const session = sessionStorage.getItem('user');
    const user = JSON.parse(session);
    let r1;
    let r2;
    if(user.data.region1){
      r1 = user.data.region1.split(" ").slice(0, 2).join(" ");
    }
  
    if(user.data.region2){
      r1 = user.data.region2.split(" ").slice(0, 2).join(" ");
    }
    const region1 = r1;
    const region2 = r2;

    useEffect(() => {
      const fetchData = async () => {
        try {
          let search ='';
          if(id == 'true'){
            search = region2;
          }else{
            search = region1;
          }
          const response1 = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/place/?address=${search}`);
          const response2 = await axios.get(`https://port-0-ggokggok-1cupyg2klvrp1r60.sel5.cloudtype.app/placesinfo/?secret=${search}`);
  
          setGetData(response1.data.data);
          setsecretData(response2.data.data);
        } catch (err) {
          console.error('Error fetching data:', error);
        } 
      };
  
      fetchData();
    }, []);

    console.log(secretData);
    const toggle = () => {
      setSecret(prevState => !prevState);
    };


    return (
        <Wrapper>
          <Title>
            <TitleDiv><BackButton></BackButton><LogoImage src={logo} alt="Logo" /><span>우리 지역 명소</span></TitleDiv>
            <div><Link to ="/upload-place" style={{textDecoration: "none"}}><WriteBtn>명소 +</WriteBtn></Link></div>
          </Title>            
            <SubTitle>
            <h2></h2>
            <button onClick={toggle} type="button">{secret ? "숨겨진 명소" : "전체" }</button>
                { !secret ?
                <div style= {{ overflow: 'auto', height: '600px' }}>
                {getData.length > 0 ? (
                        getData.map((data) => (
                            <Link to={data ? `/place-info/${data.id}` : "/"}
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
                                  <h1>명소 평점</h1>
                                  <StarRating totalStars={5} selectedStars={data.average_review} />                              </div>
                          </div>
                          </ContentBox>
                        </Link>
                  ))): <h1>게시글이 없습니다</h1>}
                </div>

              }

            </SubTitle>
        </Wrapper>
    );
}
