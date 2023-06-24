
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
import Login from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles';
import Formulario from './components/Formulario';
import HeaderNav from './components/HeaderNav'
import { AuthContext, AuthProvider } from './context/auth';

// import SideNav from './components/navigation/Sidenav';
/* eslint-disable react/no-unstable-nested-components  */
/*  eslint-disable react/prop-types */

function App() {
    function Private({ children }) {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando.....</div>
        }
        if (!authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />

            <BrowserRouter>
                <AuthProvider>
                    <HeaderNav />
                    <Routes>
                        <Route path="/formulario" element={<Private><Formulario /></Private>} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
