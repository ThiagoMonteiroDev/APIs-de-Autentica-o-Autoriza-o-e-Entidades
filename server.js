const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); // Importando as rotas de autenticação
const authMiddleware = require('./middleware/auth');

dotenv.config();
const app = express();
app.use(express.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log('MongoDB conectado'))
    .catch(err => console.log(err));

// Usando as rotas de autenticação
app.use('/api/auth', authRoutes);

// Exemplo de rota protegida
app.get('/api/protected', authMiddleware, (req, res) => {
    res.send('Esta é uma rota protegida.');
});

// Iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
