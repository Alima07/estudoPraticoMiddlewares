// Requizicao do modulo NPM Express
const express = require('express');

// Requisao do Middleware para captura da data e hora de acesso da rota home
const registroRotaHome = require('../middlewares/logRotaHome');

// Requizicao do Método Multer para trabalhar com processamento de arquivos do lado do servidor
const multer = require('multer');

// Requisicao do Middleware multerDiskStorage
const multerDiskStorage = require("../middlewares/multerDiskStorage");

// Funcao que ira receber os dados e passar para o storage fazer o trabalho de destination e filename
const upload = multer({ storage: multerDiskStorage});

//-------------------BLOCO EXPRESS-VALIDATOR------------------//

// Requisicao do express-validator destruturacao do body
const { body } = require('express-validator');

// Variavel do tipo array para validacao de cada campo do body como funcao do express-validator
const validacoes = [
    body("nomeCompleto").notEmpty().isString(),
    body("email").notEmpty().isEmail(),
    body("senha").notEmpty().isString()
];
//------------------------------------------------------------//

// Confiuracao do modulo express para chamar a função como router
const router = express.Router();

// Requisicao do IndexController dentro da pasta controller
const IndexController = require('../controllers/IndexController');

// Rota para página HOME
// Segundo parametro para chamar o middleware de rota registro Home
router.get('/', registroRotaHome, IndexController.index);

// Rota para página PRODUTOS
router.get('/produtos', IndexController.produtos);

// Rota para página CONTATO
router.get('/contato', IndexController.contato);

// Rota para página MINHA CONTA
router.get('/minhaConta', IndexController.minhaConta);

//-----------------------------------------------------//

// Rota para página CADASTRO
router.get('/cadastro', IndexController.cadastro);

// No Segundo parametro efetuamos as validacoes dos campo de formulário
// No terceiro parametro temos o middleware de rota para chamar a funcao multer onde indicamos o caminho onde sera salvo o arquivo e nome desse arquivo (IMAGEM USUARIO)
router.post('/cadastro', validacoes , upload.single('imagemUsuario'), IndexController.processingData);

//-----------------------------------------------------//

// Exportando o index router para ser usado no Indexcontroller
module.exports = router; 

