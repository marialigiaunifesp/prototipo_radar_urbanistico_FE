import axios from "axios";

// configura uma instância para enviar solicitações HTTP para o servidor que está em execução na porta definida
/*  eslint-disable arrow-body-style */
/*  eslint-disable no-else-return */
export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const createSession = async (username, password) => {
  try {
    const response = await api.post('/sessions', { username, password });
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('Credenciais inválidas. O usuário não pode entrar.');
      return error.response.status;
    } else 
      throw error;
    }
  }

