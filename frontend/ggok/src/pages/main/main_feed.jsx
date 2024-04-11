import { styled } from "styled-components";
import Get from "../../components/get_test";
import Get2 from "../../components/get_test2";
import Test from "../../components/test";
import Test2 from "../../components/test2";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
  
`;

const Hot = styled.div`
    border: 2px solid black;
    padding: 10px;
    border-radius: 10px;
    width: 300px;
    height: 75px;
`;

export default function main_feed(){


    return (
        <Wrapper>
            <Title>우리지역</Title>
            <h2>우리지역 HOT 명소</h2>
            <Hot></Hot>
            <h2>우리 지역 소식</h2>
            <div>
                <div style={{display: 'flex'}}>
                    <img src="/"></img>
                    <div>
                        <h3>맛집 기록</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <img src="/"></img>
                    <div>
                        <h3>나만 알고 싶은 충무로 카페 발견</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
                <div style={{display: 'flex'}}>
                    <img src="/"></img>
                    <div>
                        <h3>여기 진짜 맛집인데</h3>
                        <p>가나다라마바사아자차카타파하</p>
                    </div>
                </div>
            </div>
            <h2>우리 지역 명소 모음</h2>  
            <Test2></Test2>

        </Wrapper>
    );
}
