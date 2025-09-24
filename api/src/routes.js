const express = require('express');
const router = express.Router();

const Comentarios = require('./controllers/comentarios');
const Equipamento = require('./controllers/equipamentos');
const Usuario = require('./controllers/usuarios');

router.get('/', (req, res) => {
    return res.json({
        message: "API funcionando",
        rotas: [
            { metodo: "GET", rota: "/usuario", descricao: "Todos os usuários" },
            { metodo: "GET", rota: "/usuario/:id", descricao: "Um usuário pelo ID" },
            { metodo: "GET", rota: "/perfil", descricao: "Todos os perfis do usuário" },
            { metodo: "POST", rota: "/login", descricao: "Login do usuário" },
            { metodo: "POST", rota: "/equipamento", descricao: "Cadastra um novo equipamento" },
            { metodo: "GET", rota: "/equipamento", descricao: "Listagem de todos os equipamentos" },
            { metodo: "GET", rota: "/equipamento/:id", descricao: "Listagem de um equipamento pelo ID" },
            { metodo: "DELETE", rota: "/equipamento/:id", descricao: "Deleta um equipamento pelo ID" },
            { metodo: "POST", rota: "/comentario", descricao: "Cadastra um novo comentário" },
            { metodo: "GET", rota: "/comentario", descricao: "Listagem de todos os comentários" },
            { metodo: "GET", rota: "/comentario/equipamento/:id", descricao: "Listagem dos comentários de um equipamento pelo ID" }
        ]
    })
});

router.get('/usuario', Usuario.read);
router.get('/usuario/:id', Usuario.read);
router.get('/perfil', Usuario.readPerfis);
router.post('/login', Usuario.login);

router.post('/equipamento', Equipamento.create);
router.get('/equipamento', Equipamento.read);
router.get('/equipamento/:id', Equipamento.read);
router.delete('/equipamento/:id', Equipamento.del);


router.post('/comentarios', Comentarios.create);
router.get('/comentarios', Comentarios.read);
module.exports = router;
