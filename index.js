const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = 3000;

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',  // Endereço do seu servidor MySQL
    user: 'root',       // Usuário do MySQL
    password: '', // Senha do MySQL
    database: 'unisalas' // Nome do banco de dados
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Middleware para processar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta atual
app.use(express.static(path.join(__dirname)));

// Rota para processar o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    // Consulta ao banco de dados para verificar o usuário
    const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).send('Erro interno do servidor');
            return;
        }

        if (results.length > 0) {
            // Usuário autenticado com sucesso
            res.redirect('/PortalAdministrador.html'); // Redireciona para o portal do administrador
        } else {
            // Falha na autenticação
            res.send('Login falhou. Verifique suas credenciais.');
        }
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});




//git add .
//git commit -m "Descrição das mudanças"
//git pushgit   