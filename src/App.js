import React from 'react';
import  { ThemeProvider } from '@mui/material';
import theme from './theme';
// import SideNav from './navigation/sidenav/SideNav';
import Login from './components/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <SideNav /> */}
      <Login />
    </ThemeProvider>
  );
}

export default App;
