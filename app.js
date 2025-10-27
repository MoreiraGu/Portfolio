const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// --- Dados ---
const DATA_FILES = {
  dadosBasicos: 'dadosBasicos.json',
  cursos: 'cursos.json',
  projetos: 'projetos.json',
  competencias: 'competencias.json',
  redesSociais: 'redesSociais.json'
};

let dataStore = {};

// Função para carregar JSON
for (const key in DATA_FILES) {
  const filePath = path.join(__dirname, 'data', DATA_FILES[key]);
  if (fs.existsSync(filePath)) {
    dataStore[key] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } else {
    dataStore[key] = Array.isArray([]) ? [] : {};
  }
}

// Função para salvar JSON
function salvar(key) {
  const filePath = path.join(__dirname, 'data', DATA_FILES[key]);
  fs.writeFileSync(filePath, JSON.stringify(dataStore[key], null, 2));
}

// --- GETs ---
// Página principal
app.get('/', (req, res) => {
  res.render('index', dataStore);
});

// GET todos os dados (para API)
app.get('/dadosBasicos', (req, res) => res.json(dataStore.dadosBasicos));
app.get('/redesSociais', (req, res) => res.json(dataStore.redesSociais));
app.get('/cursos', (req, res) => res.json(dataStore.cursos));
app.get('/projetos', (req, res) => res.json(dataStore.projetos));
app.get('/competencias', (req, res) => res.json(dataStore.competencias));

// GET item por ID (listas)
function getByIdRoute(key) {
  app.get(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const item = dataStore[key].find(i => i.id === id);
    if (!item) return res.status(404).json({ message: 'Item não encontrado' });
    res.json(item);
  });
}
['cursos','projetos','competencias'].forEach(getByIdRoute);

// --- POST/PUT para páginas únicas ---
app.post('/basicos', (req, res) => {
  dataStore.dadosBasicos = req.body;
  salvar('dadosBasicos');
  res.json({ message: 'Dados básicos atualizados', dadosBasicos: dataStore.dadosBasicos });
});
app.put('/basicos', (req, res) => {
  dataStore.dadosBasicos = req.body;
  salvar('dadosBasicos');
  res.json({ message: 'Dados básicos atualizados', dadosBasicos: dataStore.dadosBasicos });
});

app.post('/redes', (req, res) => {
  dataStore.redesSociais = req.body;
  salvar('redesSociais');
  res.json({ message: 'Redes sociais atualizadas', redesSociais: dataStore.redesSociais });
});
app.put('/redes', (req, res) => {
  dataStore.redesSociais = req.body;
  salvar('redesSociais');
  res.json({ message: 'Redes sociais atualizadas', redesSociais: dataStore.redesSociais });
});

// --- CRUD para listas ---
function listaCRUD(key) {
  // POST - criar novo
  app.post(`/${key}`, (req, res) => {
    const newItem = req.body;
    newItem.id = dataStore[key].length ? Math.max(...dataStore[key].map(i => i.id)) + 1 : 1;
    dataStore[key].push(newItem);
    salvar(key);
    res.status(201).json(newItem);
  });

  // PUT - atualizar existente
  app.put(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataStore[key].findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item não encontrado' });
    dataStore[key][index] = { ...req.body, id };
    salvar(key);
    res.json(dataStore[key][index]);
  });

  // DELETE - remover
  app.delete(`/${key}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataStore[key].findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ message: 'Item não encontrado' });
    const deletado = dataStore[key].splice(index, 1);
    salvar(key);
    res.json({ message: 'Item deletado', item: deletado[0] });
  });
}
['cursos','projetos','competencias'].forEach(listaCRUD);

// --- Iniciar servidor ---
app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
