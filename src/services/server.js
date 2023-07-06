/*
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const port = 5000;

// simulando um banco de dados falso
const fakeDatabase = [
    { username: 'teste@hotmail.com', password: 'teste' }
];

//  configuram o body-parser para analisar os dados JSON e codificados URL enviados nas solicitações.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do CORS
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Rota para validar as credenciais do usuário
app.post('/sessions', (req, res) => {
    const { username, password } = req.body;

    // Verificando se as credenciais correspondem a algum usuário no banco de dados falso
    const user = fakeDatabase.find(user => user.username === username && user.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, "J7bD5pX9qR3wM2sZ8tN6", { expiresIn: '1h' });
        res.status(200).json({ message: 'Credenciais válidas. O usuário pode entrar.', token, username });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas. O usuário não pode entrar.' });
    }
    return res.status;
});

// Inicie o servidor
app.listen(port, () => {
    console.log(`Servidor escutando em http://localhost:${port}`);
});
*/