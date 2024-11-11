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
  password: process.env.DB_PASS || 'unisalas',
  database: process.env.DB_NAME || 'unisalas',
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  try {
    const [rows] = await promisePool.query(query, [email, senha]);
    if (rows.length > 0) {
      // Usuário autenticado com sucesso
      res.redirect('/PortalAdministrador.html'); // Redireciona para o portal do administrador
    } else {
      // Falha na autenticação
      res.status(401).send('Login falhou. Verifique suas credenciais.');
    }
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).send('Erro interno do servidor');
  }
});

// Rota para salvar aulas
app.post('/salvar-aulas', async (req, res) => {
  const { nome_sala, polo, dia_semana, primeiro_horario, segundo_horario } = req.body;

  console.log('Dados recebidos para salvar aulas:', req.body);

  if (!nome_sala || !polo || !dia_semana) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios faltando.' });
  }

  try {
      const [result] = await promisePool.query(
          `INSERT INTO aulas (nome_sala, polo, dia_semana, primeiro_horario, segundo_horario) VALUES (?, ?, ?, ?, ?)`,
          [nome_sala, polo, dia_semana, primeiro_horario || null, segundo_horario || null]
      );

      console.log('Resultado da inserção:', result);

      res.json({ success: true, message: 'Aulas salvas com sucesso!' });
  } catch (err) {
      console.error('Erro ao salvar aulas:', err);
      res.status(500).json({ success: false, message: 'Erro ao salvar aulas.' });
  }
});


app.get('/views', async (req, res) => {
  try {
    // Verificar se o contador existe
    const [results] = await promisePool.query('SELECT * FROM views LIMIT 1');

    if (results.length === 0) {
      // Se o contador não existir, cria um com valor 0
      await promisePool.query('INSERT INTO views (views) VALUES (0)');
      res.json({ views: 0 });
    } else {
      // Incrementa o contador de acessos
      let currentViews = results[0].views;
      currentViews++;

      await promisePool.query('UPDATE views SET views = ? WHERE id = ?', [currentViews, results[0].id]);
      res.json({ views: currentViews });
    }
  } catch (err) {
    console.error('Erro ao atualizar visualizações:', err);
    res.status(500).json({ message: 'Erro ao atualizar visualizações' });
  }
});




// Rota para buscar aulas com base no dia e no polo
// Rota para buscar aulas com base no dia e no polo
app.get('/buscar-aulas', async (req, res) => {
  const { dia_semana, polo } = req.query;

  try {
    const [rows] = await promisePool.query(
      `SELECT nome_sala, polo, dia_semana, primeiro_horario, segundo_horario FROM aulas WHERE dia_semana = ? AND polo = ?`,
      [dia_semana, polo]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Erro ao buscar aulas:', err);
    res.status(500).json({ success: false, message: 'Erro ao buscar aulas.' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.html'));
});


// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`);
});
