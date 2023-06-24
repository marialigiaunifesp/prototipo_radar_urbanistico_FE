import axios from "axios";

// configura uma instância para enviar solicitações HTTP para o servidor que está em execução na porta definida
/*  eslint-disable arrow-body-style */
export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const createSession = async (username, password) => {
  return api.post('/sessions', { username, password });
}

