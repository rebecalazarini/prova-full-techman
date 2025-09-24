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
    const { senha } = req.body;
    const usuario = await prisma.usuario.findFirst({
        where: {
            senha: senha
        }, select: {
            id: true,
            perfil: true
        }
    });
    if (usuario === null) {
        return res.status(401).json("Senha incorreta");
    }
    return res.json(usuario);
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