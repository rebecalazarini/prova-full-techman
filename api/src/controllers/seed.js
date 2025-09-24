const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path');


function lerCSV(caminho) {
  return fs.readFileSync(caminho, 'utf8')
    .split(/\r?\n/)
    .filter((linha, i) => i > 0 && linha) 
    .map(linha => linha.split(';').map(campo => campo.trim()));
}

async function inserePerfis() {
  const linhas = lerCSV(path.join(__dirname, '../../data/perfis.csv'));
  for (const [id, perfil] of linhas) {
    await prisma.perfil.create({
      data: { id: Number(id), perfil }
    });
  }
  return linhas.length;
}

async function insereUsuarios() {
  const linhas = lerCSV(path.join(__dirname, '../../data/usuarios.csv'));
  for (const [id, senha, perfil] of linhas) {
    await prisma.usuario.create({
      data: { id: Number(id), senha, perfil: Number(perfil) }
    });
  }
  return linhas.length;
}

async function insereEquipamentos() {
  const linhas = lerCSV(path.join(__dirname, '../../data/equipamentos.csv'));
  for (const [id, equipamento, imagem, descricao, ativo, data] of linhas) {
    await prisma.equipamento.create({
      data: {
        id: Number(id),
        equipamento,
        imagem,
        descricao,
        ativo: Number(ativo),
        data: data ? new Date(data) : null
      }
    });
  }
  return linhas.length;
}

async function insereComentarios() {
  const linhas = lerCSV(path.join(__dirname, '../../data/comentarios.csv'));
  for (const [id, comentario, equipamento, perfil, data] of linhas) {
    await prisma.comentario.create({
      data: {
        id: Number(id),
        comentario: comentario || '',
        equipamento: Number(equipamento),
        perfil: Number(perfil),
        data: data ? new Date(data) : null
      }
    });
  }
  return linhas.length;
}

(async () => {
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

    console.log('Seed executada com sucesso!');
    console.log({ perfis, usuarios, equipamentos, comentarios });

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar seed:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();