/* eslint-disable camelcase */
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
  const { login } = useContext(AuthContext);


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("submit", { username, password });
    login(username, password);

    // integtação com o contexto / api

    // const userData = {
    //   username,
    //   password
    // };

    // axios.post('URL_DA_SUA_API/login/', userData)
    //   .then(response => {
    //     const token = response.data.access;
    //     const decodedToken = jwt_decode(token);

    //     console.log(decodedToken)

    //     // Armazene o token em localStorage ou em um estado global (ex: Redux) para uso posterior

    //     // Redirecione para a página principal ou faça outras ações necessárias
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     // Lide com o erro de autenticação, exiba uma mensagem de erro, etc.
    //   });
  };

  return (
  <div className = "login-container">
    <ThemeProvider theme={theme}>
      <LoginContainer>
        <form className="form-login" onSubmit={handleSubmit}>
          <Title>Login de Usuário</Title>
          <div>
            <input
              id="outlined-basic" className="input-login" label="Usuário"
              type="text" name="username" required
              value={username} onChange={e => setUserName(e.target.value)} />

            <input id="outlined-basic" className="input-login" type="password"
              name="password" required value={password} label="Senha"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <Button className="button-login" variant="contained" type="submit">Login</Button>
        </form>
      </LoginContainer>
    </ThemeProvider>
    </div>
  );
}

export default Login;
