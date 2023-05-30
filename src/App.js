import React from 'react';
import  { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
// import SideNav from './components/navigation/Sidenav';
// import Login from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles';
import HeaderNav from './components/HeaderNav'
import Formulario from './components/Formulario';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HeaderNav />
      {/* <SideNav /> */}
      <Formulario />
      {/* <Login /> */}

    </ThemeProvider>
  );
}

export default App;
