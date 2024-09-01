Olá, imagino que vocês estejam aqui para baixar o projeto e poder fazer ele rodar na sua maquina local, para que isso se realize vamos a alguns passos importantes. 
1. Ter o MySQL instalado.
2. Ter o Node.js instalado.



Passo a passo para realizar estas intalações. 
MySQL estou utilizando o XAMPP que vem com o mysql instalado. podem acessar este site ("https://www.apachefriends.org/pt_br/download.html") e realizar o download do programa, e então é so realziar a instalaçao do mesmo,
com o xampp instalado, vamos instalar o MySQL workbenc, que é a ferramenta para manipular o banco de dados. podem acessar este link ("https://dev.mysql.com/downloads/workbench/"), realizar o download e depois disso a instalação.
vamos abrir o server do MySQL no workbench. 
primeiro abra o Xampp control panel, algumas opções estarão disponiveis, clique em start a frente do MySQL, agora abra o workbench. clique no icone "+" de um nome a conexão, e verifique se a porta que está no xampp control panel é a mesma que esta em porta na nova conexão do workbench, se for clique em "Ok".

agora no script adicione isto, vá selecionando cada bloco separado por uma linha, e rode o codigo, cada vez que seleciona uma linha.
	CREATE DATABASE unisalas;

	USE unisalas;

	CREATE TABLE usuarios (
		id INT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255) NOT NULL UNIQUE,
		senha VARCHAR(255) NOT NULL,
		nome VARCHAR(255)
	);

	-- Exemplo de inserção de um usuário
	INSERT INTO usuarios (email, senha, nome) VALUES ('coordenador@exemplo.com', '123456', 'Coordenador');

	-- Tabela para armazenar as salas
	CREATE TABLE salas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		nome_sala VARCHAR(100) NOT NULL,
		polo VARCHAR(50) NOT NULL
	);


	-- Tabela para armazenar as aulas e horários
	CREATE TABLE aulas (
		id INT AUTO_INCREMENT PRIMARY KEY,
		dia_semana ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday') NOT NULL,
		primeiro_horario VARCHAR(100),
		segundo_horario VARCHAR(100),
		sala_id INT,
		FOREIGN KEY (sala_id) REFERENCES salas(id)
	);

    --Visualiza a tabela aulas, para ver se está fazendo a inserção correta de dados passadas pelo cordenador.
	select * from  aulas;
    

 



Agora vamos a instalação do Node.js, so acessar este link ("https://nodejs.org/en/download/source-code"), realizar o download e em seguida instalar. 
com o node instalado, abra o prompt de comandos do seu desktop e de o comando "node" ele deve retornar uma informação como "Welcome to Node.js v20.13.1." o que significa que o node foi instalado com sucesso!


Partindo agora para baixar o projeto para a sua maquina local. 
1. estar no repositorio do projeto.
2. clicar no botão verde escrito code.
3. e copiar a url que estara disponivel.
4. agora abra o vscode, na pagina inicial do vscode.
5. nesta pagina tera uma opção com o nome "clone git Repository..."
6. cole a url que voce copiou no github.
7. abrira uma tela para selecionar uma pasta que sera o destino, sugiro criar uma pasta em documentos/projetoextensao
8. ele inicializara um download, e retornara uma mensagem que está pronto e se deseja abrir, clique em abrir.
9. uma mensagem dizendo que o vscode não sabe se os arquivos, são confiaveis aparecera selecione a opção em azul que indica que você confia nos arquivos 

pronto o projeto ja está no seu descktop. 

para rodar o site, de o seguinte comando no terminal do vscode. 
node index.js 

isso vai rodar o site, agora é so abrir o navegador de colocar este link http://localhost:3000/
