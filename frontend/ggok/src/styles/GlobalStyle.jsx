import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
   

    @font-face {
      font-family: 'TTLaundryGothicB';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/TTLaundryGothicR.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
  }

    body {
        font-family: 'TTLaundryGothicB', 'basicFont', Arial, sans-serif;
    }
`;

export default GlobalStyle;
