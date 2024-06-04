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

  @font-face {
    font-family: 'MangoDdobak-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: 'WavvePADO-Regular';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}

    * {
        font-family:  'WavvePADO-Regular', 'MangoDdobak-B' 'basicFont', Arial, sans-serif;
    }

    body {
        font-family: 'WavvePADO-Regular', 'MangoDdobak-B', 'basicFont', Arial, sans-serif;
    }
`;

export default GlobalStyle;
