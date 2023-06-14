/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { ThemeProvider } from 'styled-components';
import theme from '../../configs/theme';
import { LoginContainer, Title } from './styled';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      username,
      password
    };

    axios.post('URL_DA_SUA_API/login/', userData)
      .then(response => {
        const token = response.data.access;
        const decodedToken = jwt_decode(token);

        console.log(decodedToken)

        // Armazene o token em localStorage ou em um estado global (ex: Redux) para uso posterior

        // Redirecione para a página principal ou faça outras ações necessárias
      })
      .catch(error => {
        console.error(error);
        // Lide com o erro de autenticação, exiba uma mensagem de erro, etc.
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginContainer>
          <Title>Login de Usuário</Title>
          <FormControl onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic" label="Usuário" variant="outlined"
              type="text" name="username" required
              value={username} onChange={e => setUserName(e.target.value)} />
            <br />
            <TextField id="outlined-basic" variant='outlined' type="password"
              name="password" required value={password} label="Senha"
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <Button variant="contained" type="submit">Login</Button>
          </FormControl>
      </LoginContainer>
    </ThemeProvider>
  );
}

export default Login;
