import { createGlobalStyle } from 'styled-components';
import { design } from '../utils';

const GlobalStyles = createGlobalStyle`
html, body, #___gatsby, #___gatsby > div {
  height: 100%;
}
body {
  background-color: ${design.colors.primary}
}
`;

export default GlobalStyles;
