import React from 'react';
import  { ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import Formulario from "./componentes/Formulario";
// import ResponsiveAppBar from './navigation/header/AppBar';
import theme from './theme';
import SideNav from './navigation/sidenav/SideNav';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SideNav />
      <Container maxWidth>
      <Formulario />
      </Container>
    </ThemeProvider>
  );
}

export default App;
