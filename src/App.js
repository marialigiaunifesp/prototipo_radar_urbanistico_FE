
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
<<<<<<< HEAD
// import SideNav from './components/Sidenav';
// import Login from './components/LoginForm';
=======
import Login from './components/LoginForm';
>>>>>>> develop
import GlobalStyles from './styles/GlobalStyles';
import Formulario from './components/Formulario';
import HeaderNav from './components/HeaderNav'
// import SideNav from './components/navigation/Sidenav';


function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <HeaderNav />
            <BrowserRouter>
                <Routes>
                    <Route path="/formulario" element={<Formulario />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
