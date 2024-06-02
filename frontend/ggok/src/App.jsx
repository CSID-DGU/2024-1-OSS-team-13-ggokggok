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
import NoNavLayout from './components/noNavLayout';
import Intro from "./pages/login/intro";
import Feed from "./pages/main/main_feed";
import Upload from "./pages/community/upload_feed/upload";
import Upload_place from "./pages/community/upload_feed/upload_place";
import GlobalStyle from "./styles/GlobalStyle";
import Feed_list from "./pages/community/list/feed_list";
import Place_list from "./pages/community/list/place_list";
import Feed_info from "./pages/community/info/feed_info"
import Place_info from "./pages/community/info/place_info"
import My_map from "./pages/roadmap/my_map"
import MyPage from "./pages/mypage/mypage";
import SearchPlace from "./pages/community/upload_feed/search-place";
import Total_info from "./pages/community/info/total_info";
import Visitor_main from "./pages/community/visitor/visitor_main";
import V_Feed_list from "./pages/community/visitor/list/v_feed_list";
import V_Place_list from "./pages/community/visitor/list/v_place_list";
import V_Feed_info from "./pages/community/visitor/info/v_feed_info";
import V_Place_info from "./pages/community/visitor/info/v_place_info";



const Wrapper = styled.div`

    height: 860px;
    align-items: center;  
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
        path:"feed",
        element: <Feed/>,

      },
      {
        path:"upload",
        element: <Upload/>,

      },
      {
        path:"upload-place",
        element: <Upload_place/>,

      },
      {
        path:"feed-list",
        element: <Feed_list/>,

      },
      {
        path:"place-list",
        element: <Place_list/>,

      },
      {
        path:"feed-info/:id",
        element: <Feed_info/>,

      },
      {
        path:"place-info/:id",
        element: <Place_info/>,

      },
    
      {
        path:"/info-region",
        element: <InfoRegion/>
      },
      {
        path:"/my-map",
        element: <My_map/>
      },
      {
        path:"mypage",
        element: <MyPage/>,
      },     
      {
        path:"search-place",
        element: <SearchPlace/>,
      },
      {
        path:"searchplace",
        element: <SearchPlace/>,
      }
      , 
      {
        path: "total-info/:id",
        element: <Total_info/>,
      },
      {
        path: 'visitor-feed/:id',
        element: <Visitor_main/>
      },
      {
        path: 'visitor-feed-list/:id',
        element: <V_Feed_list/>
      },      {
        path: 'visitor-place-list/:id',
        element: <V_Place_list/>
      },      
      {
        path: 'visitor-feed-info/:id',
        element: <V_Feed_info/>
      },
      {
        path: 'visitor-place-info/:id',
        element: <V_Place_info/>
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
    element: <Protected_login><SetRegion/></Protected_login> 
  },

  {
    path:"/search-region",
    element: <Protected_login><SearchRegion/></Protected_login>
  },


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