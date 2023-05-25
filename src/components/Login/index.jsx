/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ThemeProvider } from 'styled-components';
import theme from '../../configs/theme';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

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
      <Box sx={ { background: 'primary.light' } }>
        <FormControl onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic" label="Usuário" variant="outlined"
            type="text" name="username" required
            value={username} onChange={handleInputChange} />
          <br />
          <TextField id="outlined-basic" variant='outlined' type="password"
            name="password" required value={password} label="Senha"
            onChange={handleInputChange}
          />
          <br />
          <Button variant="contained" type="submit">Login</Button>
        </FormControl>

      </Box>
    </ThemeProvider>
  );
}

export default Login;
