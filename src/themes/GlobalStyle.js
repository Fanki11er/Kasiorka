import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
@import url('https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        font-size: 62.5%;
        width: 100vw;
    }

    body {
        min-width: 100%;
        max-width: 100%;
        min-height: 100%;
        font-size: 1.6rem;
        font-family: "Roboto", sans-serif;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
