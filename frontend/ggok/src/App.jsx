import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/login/login";
import Map from "./pages/main/main_map";
import CreateAccount from "./pages/login/create-account";
import SetRegion from "./pages/region/set-region";
import SearchRegion from "./pages/region/search-region";
import InfoRegion from "./pages/region/info-region"
import { useEffect, useState } from "react";
import styled from "styled-components";
import Protected_login from "./components/protected_login";
import Layout from "./components/layout";
import Community from "./pages/community/community";
import Intro from "./pages/login/intro";
import Feed from "./pages/main/main_feed";
import Upload_form from "./pages/community/upload_feed/upload";
import GlobalStyle from "./styles/GlobalStyle";
import './others/font/font.css'; 



const Wrapper = styled.div`

    height: 860px;
    align-items: center;  
    font-family: "TTLaundryGothicB", "sans-serif", "GeekbleMalang2";
    color: #534340;
    text-align: center;
    display: flex;
    justify-content: center;
    height: 100vh;

    
`;


const router = createBrowserRouter([
  {
    path:"/",
    element: <Protected_login> <Layout/> </Protected_login>,
    children: [
      {
        path:"",
        element: <Map/>,
        
      },

    
      {
        path:"/community",
        element: <Community/>,

      },
      {
        path:"feed",
        element: <Feed/>,

      },
      {
        path:"/upload",
        element: <Upload_form/>,

      },
    ]
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/create-account",
    element: <CreateAccount/>
  },
  {
    path:"/intro",
    element: <Intro/>
  },
  {
    path:"/set-region",
    element: <SetRegion/>
  },

  {
    path:"/search-region",
    element: <SearchRegion/>
  },

  {
    path:"/info-region",
    element: <InfoRegion/>
  }


]);


function App() {

  return(
    <Wrapper>
      <GlobalStyle />
      <RouterProvider router={router} />
    </Wrapper>
  
  );

}

export default App