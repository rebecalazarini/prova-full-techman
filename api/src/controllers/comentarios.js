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
    const { equipamento, perfil, comentario } = req.body;
    const coment = await prisma.comentario.create({
        data: {
            equipamento: parseInt(equipamento),
            perfil: parseInt(perfil),
            comentario: comentario
        }
    });
    return res.status(201).json(coment).end();
};

module.exports = {
    read,
    create
};