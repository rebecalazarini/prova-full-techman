const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.use('/', routes); 

router.get('/equipamento', async (req, res) => {
  try {
    const equipamentos = await prisma.equipamento.findMany({
      where: { ativo: 1 },
      include: { comentarios: true }, // Pega os comentários relacionados
      orderBy: { data: 'desc' }
    });
    res.json(equipamentos); // 🔹 aqui você já devolve JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
});

app.listen(3000, () => {
    console.log('API respondendo em http://localhost:3000')
});