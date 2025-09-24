const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');

async function inserePerfis() {
    const perfisData = fs.readFileSync(path.join(__dirname, '../../data/perfis.csv'), 'utf8');
    const linhas = perfisData.split('\r\n');
    const resultados = await Promise.all(linhas.map((linha, i) => {
        if (i > 0 && linha) {
            const [id, perfil] = linha.split(';');
            return prisma.perfil.create({
                data: {
                    id: Number(id),
                    perfil
                }
            });
        }
        return null;
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereUsuarios() {
    const usuariosData = fs.readFileSync(path.join(__dirname, '../../data/usuarios.csv'), 'utf8');
    const linhas = usuariosData.split('\r\n');
    const resultados = await Promise.all(linhas.map((linha, i) => {
        if (i > 0 && linha) {
            const [id, senha, perfil] = linha.split(';');
            return prisma.usuario.create({
                data: {
                    id: Number(id),
                    senha,
                    perfil: Number(perfil)
                }
            });
        }
        return null;
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereEquipamentos() {
    const equipamentosData = fs.readFileSync(path.join(__dirname, '../../data/equipamentos.csv'), 'utf8');
    const linhas = equipamentosData.split('\r\n');
    const resultados = await Promise.all(linhas.map((linha, i) => {
        if (i > 0 && linha) {
            const [id, equipamento, imagem, descricao, ativo, data] = linha.split(';');
            return prisma.equipamento.create({
                data: {
                    id: Number(id),
                    equipamento,
                    imagem,
                    descricao,
                    ativo: Number(ativo),
                    data: new Date(data)
                }
            });
        }
        return null;
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

async function insereComentarios() {
    const comentariosData = fs.readFileSync(path.join(__dirname, '../../data/comentarios.csv'), 'utf8');
    const linhas = comentariosData.split('\r\n');
    const resultados = await Promise.all(linhas.map((linha, i) => {
        if (i > 0 && linha) {
            const [id, comentario, equipamento, perfil, data] = linha.split(';');
            return prisma.comentario.create({
                data: {
                    id: Number(id),
                    comentario,
                    equipamento: Number(equipamento),
                    perfil: Number(perfil),
                    data: new Date(data)
                }
            });
        }
        return null;
    }));
    return resultados.filter(s => s !== null && s !== undefined).length;
}

// Função principal para semear os dados
async function run(req, res) {
    try {
        await prisma.$connect();
        await prisma.comentario.deleteMany();
        await prisma.equipamento.deleteMany();
        await prisma.usuario.deleteMany();
        await prisma.perfil.deleteMany();
        const perfis = await inserePerfis();
        const usuarios = await insereUsuarios();
        const equipamentos = await insereEquipamentos();
        const comentarios = await insereComentarios();
        await prisma.$disconnect();
        res.json({ perfis, usuarios, equipamentos, comentarios });
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }
};

module.exports = {
    run
};