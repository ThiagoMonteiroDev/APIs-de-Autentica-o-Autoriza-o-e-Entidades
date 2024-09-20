const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Registro de Usuário
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Verifique se o username e a password foram enviados
    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios.');
    }

    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('Usuário criado com sucesso.');
    } catch (error) {
        console.error(error); // Adicione um log para ajudar no diagnóstico
        res.status(400).send('Erro ao criar usuário: ' + error.message);
    }
});

// Login de Usuário
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Verifique se o username e a password foram enviados
    if (!username || !password) {
        return res.status(400).send('Username e password são obrigatórios.');
    }

    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).send('Credenciais inválidas.');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
