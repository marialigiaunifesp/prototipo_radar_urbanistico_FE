/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { ThemeProvider } from 'styled-components';
import theme from '../../configs/theme';
import { LoginContainer, Title } from './styled';
import { AuthContext } from '../../context/auth';
import './styled.css'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { login, invalidUser } = useContext(AuthContext);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", { username, password });
    login(username, password);
  };

  return (
  <div className = "login-container">
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <form className="form-login" onSubmit={handleSubmit}>
          <Title>Login</Title>
          <div className="input-login">
            <label htmlFor="usuario">E-mail</label>
            <input
              id="usuario" className="input-login" label="Usuário"
              type="text" name="username" required
              value={username} onChange={e => setUserName(e.target.value)} />
             
            <label htmlFor="password">Senha</label>
            <input id="password" className="input-login" type="password"
              name="password" required value={password} label="Senha"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {invalidUser && (
            <div>
              <small id="credencial">Credencial inválida</small>
            </div>
          )}
          <Button className="button-login" variant="contained" type="submit">Entrar</Button>
        </form>
      </LoginContainer>
    </ThemeProvider>
    </div>
  );
}

export default Login;
