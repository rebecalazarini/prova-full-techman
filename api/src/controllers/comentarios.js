const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const comentario = await prisma.comentario.findMany({
            where: {
                equipamento: parseInt(req.params.id)
            },
            orderBy: {
                data: 'desc'
            }
        });
        return res.json(comentario);
    } else {
        const comentarios = await prisma.comentario.findMany();
        return res.json(comentarios);
    }
};

const create = async (req, res) => {
    try {
        const coment = await prisma.comentario.create({
            data: req.body
        });
        return res.status(201).json(coment).end();
    } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar comentário', details: error.message });
    }
};

module.exports = {
    read,
    create
};