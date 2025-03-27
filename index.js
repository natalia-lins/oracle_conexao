require('dotenv').config();
const express = require('express');
const { getUsers, createUser } = require('./models/userModel_oracle');

const app = express();
const PORT = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Servidor com Oracle funcionando! :)');
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await getUsers();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar usuários', detalhe: error.message });
    }
});

app.post('/usuarios', async (req, res) => {
    try {
        const { nome, email } = req.body;
        await createUser(nome, email);
        res.json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar usuário', detalhe: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});


