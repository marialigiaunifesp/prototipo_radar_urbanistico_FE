import React from 'react';
import  { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
// import SideNav from './components/navigation/Sidenav';
// import Login from './components/Login';
import GlobalStyles from './styles/GlobalStyles';
import HeaderNav from './components/HeaderNav'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HeaderNav />
      {/* <SideNav /> */}
      {/* <Login /> */}
    </ThemeProvider>
  );
}

export default App;
