import React from 'react';
import  { ThemeProvider } from '@mui/material';
import theme from './theme';
import SideNav from './navigation/sidenav/SideNav';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <SideNav />
    </ThemeProvider>
  );
}

export default App;
