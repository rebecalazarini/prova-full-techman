const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const usuario = await prisma.perfil.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            select: {
                id: true,
                perfil: true,
                usuarios: true
            }
        });
        return res.json(usuario);
    } else {
        const usuarios = await prisma.usuario.findMany({});
        return res.json(usuarios);
    }
};

const login = async (req, res) => {
    const { id, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) }, // Garantir que seja number
        select: { id: true, senha: true, perfil: true }
    });

    if (!usuario) {
        return res.status(401).json({ error: "Usuário não encontrado" });
    }

    // Comparação de senha em texto puro
    if (usuario.senha !== senha.trim()) { // remover espaços extras
        return res.status(401).json({ error: "Senha incorreta" });
    }

    return res.json({
        id: usuario.id,
        perfil: usuario.perfil
    });
};


const readPerfis = async (req, res) => {
    const perfis = await prisma.perfil.findMany({});
    return res.json(perfis);
};

module.exports = {
    read,
    login,
    readPerfis
};