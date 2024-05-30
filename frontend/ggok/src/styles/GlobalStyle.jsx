import { createGlobalStyle } from 'styled-components';
import reset from "styled-reset";



const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
    font-family: "basicTTF";
      font-style: normal;
      src: url("src/others/font/laundryRegular.otf") format("opentype")
    }

    @font-face {
      font-family: "basicOTF";
      font-style: normal;
      src: url("src/others/font/laundryRegular.ttf") format("truetype");
  }

    body {
        font-family: "basicOTF";
    }
`;

export default GlobalStyle;