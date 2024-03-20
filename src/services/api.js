import axios from "axios";

// configura uma instância para enviar solicitações HTTP para o servidor que está em execução na porta definida
/*  eslint-disable arrow-body-style */
/*  eslint-disable no-else-return */
/*
export const api = axios.create({
  baseURL: "http://localhost:5000",
});
*/

export const createSession = async (username, password) => {
  const data = {"username":username, "password" : password};
  const url = 'https://gerenciall.onrender.com/api/token/';
  // const url = 'http://localhost:8000/api/token/';
  try {
    // const response = await api.post('/sessions', { username, password });
    const response = await axios.post(url ,data);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401 && error.response.status === 205) {
      console.log('Credenciais inválidas. O usuário não pode entrar.');
      return error.response.status;
    } else 
      throw error;
    }
  }

export default createSession