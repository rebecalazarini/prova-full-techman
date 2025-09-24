const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
require('dotenv').config();

// Função para inserir Perfis
async function inserePerfis() {
  const perfisData = [];

  fs.createReadStream('./prisma/dados/perfis.csv')  // Caminho correto
    .pipe(csv())
    .on('data', (row) => {
      perfisData.push({
        id: Number(row.id),
        perfil: row.perfil,
      });
    })
    .on('end', async () => {
      for (const perfil of perfisData) {
        await prisma.perfil.create({
          data: perfil,
        });
      }
      console.log('Perfis importados');
    });
}

// Função para inserir Usuários
async function insereUsuarios() {
  const usuariosData = [];

  fs.createReadStream('./prisma/dados/usuarios.csv')  // Caminho correto
    .pipe(csv())
    .on('data', (row) => {
      usuariosData.push({
        id: Number(row.id),
        senha: row.senha,
        perfil: Number(row.perfil),
      });
    })
    .on('end', async () => {
      for (const usuario of usuariosData) {
        await prisma.usuario.create({
          data: usuario,
        });
      }
      console.log('Usuários importados');
    });
}

// Função para inserir Equipamentos
async function insereEquipamentos() {
  const equipamentosData = [];

  fs.createReadStream('./prisma/dados/equipamentos.csv')  // Caminho correto
    .pipe(csv())
    .on('data', (row) => {
      equipamentosData.push({
        id: Number(row.id),
        equipamento: row.equipamento,
        imagem: row.imagem,
        descricao: row.descricao,
        ativo: Number(row.ativo),
        data: new Date(row.data) && !isNaN(new Date(row.data)) ? new Date(row.data) : null,  // Verificando se a data é válida
      });
    })
    .on('end', async () => {
      for (const equipamento of equipamentosData) {
        await prisma.equipamento.create({
          data: equipamento,
        });
      }
      console.log('Equipamentos importados');
    });
}

// Função para inserir Comentários
async function insereComentarios() {
  const comentariosData = [];

  fs.createReadStream('./prisma/dados/comentarios.csv')  // Caminho correto
    .pipe(csv())
    .on('data', (row) => {
      comentariosData.push({
        id: Number(row.id),
        comentario: row.comentario || '', // Garantir que o campo comentario não seja undefined
        equipamento: Number(row.equipamento),
        perfil: Number(row.perfil),
        data: new Date(row.data) && !isNaN(new Date(row.data)) ? new Date(row.data) : null,  // Verificando se a data é válida
      });
    })
    .on('end', async () => {
      for (const comentario of comentariosData) {
        await prisma.comentario.create({
          data: comentario,
        });
      }
      console.log('Comentários importados');
    });
}

async function run(req, res) {
  try {
    await inserePerfis();
    await insereUsuarios();
    await insereEquipamentos();
    await insereComentarios();

    res.json({ message: 'Importação dos dados concluída!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro na importação dos dados' });
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { run };
