
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {React, useState} from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './configs/theme';
import Login from './components/LoginForm';
import GlobalStyles from './styles/GlobalStyles';
import Formulario from './components/Formulario';
import HeaderNav from './components/HeaderNav'
import { AuthContext } from './context/auth';

// import SideNav from './components/navigation/Sidenav';

/*  eslint-disable react/jsx-no-constructed-context-values */

function App() {

    const [user, SetUser] = useState(null);

    // const authContextValue = useMemo(() => ({
    //     authenticated: !!user,
    //     user,
    //     login,
    //     logout
    //   }), [user, login, logout]);

    const login = (email, password) => {
        console.log("login", {email, password});
        SetUser({id: "123", email})
    };
    const logout = () => {
        console.log("logout");
    };
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyles />
            <HeaderNav />
            <BrowserRouter>
                <AuthContext.Provider value={{autheticated: !!user, user, login, logout}}>
                {/* <AuthContext.Provider value={authContextValue}> */}
                    <Routes>
                        <Route path="/formulario" element={<Formulario />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
