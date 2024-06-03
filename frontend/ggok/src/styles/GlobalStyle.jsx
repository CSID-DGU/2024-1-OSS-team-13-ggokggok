import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";



const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: "basicWOfF";
      src: url("/src/others/font/laundryRegular.woff") format("woff")
    }

    @font-face {
      font-family: "basicTTF";
      font-style: normal;
      src: url("/src/others/font/laundryRegular.ttf") format("truetype");
  }

    body {
        font-family: "basicWOFF";
    }
`;

export default GlobalStyle;