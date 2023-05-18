import React from 'react';
import  { ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Formulario from "./componentes/Formulario";
import theme from './theme';
import SideNav from './navigation/sidenav/SideNav';
import OpenLayerMap from './componentes/OpenLayerMap';
import Reports from './componentes/Reports';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <SideNav />
      <Container maxWidth>
      <Router>
          <Route path="/maps" element={<OpenLayerMap />} />
          <Route path="/report" component={<Reports />} />
          <Route path="/docs" component={<Formulario />} />
      </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
