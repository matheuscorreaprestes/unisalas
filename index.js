const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do pool de conexões com o MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'unisalas',
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Rota para salvar salas
app.post('/salvar-sala', async (req, res) => {
  const { nome_sala, polo } = req.body;

  try {
    const [result] = await promisePool.query(
      `INSERT INTO salas (nome_sala, polo) VALUES (?, ?)`,
      [nome_sala, polo]
    );
    res.json({ success: true, message: 'Sala salva com sucesso!', salaId: result.insertId });
  } catch (err) {
    console.error('Erro ao salvar sala:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar sala.' });
  }
});

// Rota para salvar aulas
app.post('/salvar-aulas', async (req, res) => {
  const { dia_semana, primeiro_horario, segundo_horario, sala_id } = req.body;

  console.log('Dados recebidos para salvar aulas:', req.body); // Log para verificar os dados recebidos

  if (!dia_semana || !sala_id) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios faltando.' });
  }

  try {
    const [result] = await promisePool.query(
      `INSERT INTO aulas (dia_semana, primeiro_horario, segundo_horario, sala_id) VALUES (?, ?, ?, ?)`,
      [dia_semana, primeiro_horario || null, segundo_horario || null, sala_id]
    );
    
    console.log('Resultado da inserção:', result); // Log para verificar o resultado da inserção

    res.json({ success: true, message: 'Aulas salvas com sucesso!' });
  } catch (err) {
    console.error('Erro ao salvar aulas:', err);
    res.status(500).json({ success: false, message: 'Erro ao salvar aulas.' });
  }
});


// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
