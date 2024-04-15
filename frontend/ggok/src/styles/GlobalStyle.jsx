import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";


const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: "GeekbleMalang2";
      font-style: normal;
      font-weight: 100;
      src: url("src/others/font/런드리고딕Regular.ttf") format("truetype");
    }
    body {
        font-family: "GeekbleMalang2";
    }
`;

export default GlobalStyle;