const express = require('express')
const mongoose = require("mongoose");

const Filme = require('./models/FilmeModel');

const MONGO_URL = 'mongodb+srv://osvaldobnu:osvaldobnu123456@ecommerce.xfoxnlf.mongodb.net/ecommerce';
mongoose.connect(MONGO_URL)
    .then(() => console.log("Banco conectado"))
    .catch((erro) => console.log(erro));

const server = express()


server.use(express.json())


const filmes = [
    { "id": 1, "nome": "A menina que gostava de ler ", "nota": 9 },
    { "id": 2, "nome": "X-men ", "nota": 2 },
    { "id": 3, "nome": "Barbie ", "nota": 10 },
    { "id": 4, "nome": "Pânico", "nota": 1 },
]


// Teste endpoint raiz
server.get("/", (req, res) => {
    return res.send("Recebi a requisição com sucesso!")
})

server.post("/filmes", async (req, res) => {

    const { nome, nota } = req.body;

    filmes.push(req.body)

    const novoFilme = new Filme({
        nome : nome,
        nota: nota,
    });

    try {
        await novoFilme.save();

        res.status(201).json({ mensagem: "Usuário criado com sucesso" });
    } catch (error) {
        res.status(500).json({ mensagem: error });
    }

    return res.send("Filme adicionado com sucesso")
})


server.put("/filmes/:id", (req, res) => {
    const filmeId = req.params.id


    const { nome, nota } = req.body;


    const filme = filmes.find(filme => filme.id == filmeId)


    if (!filme) {
        return res.status(404).send("Filme não encontrado")
    }


    filme.nome = nome;
    filme.nota = nota

    return res.status(200).send("Filme Alterado com sucesso")
})

server.delete("/removeAnimal/:id", (req, res) => {
    const animalId = parseInt(req.params.id);


    // Encontre o índice do animal na lista pelo ID
    const animalIndex = animais.findIndex(animal => animal.id === animalId);


    // Se o animal não for encontrado, retorne um erro 404
    if (animalIndex === -1) {
        return res.status(404).send("Animal não encontrado");
    }


    // Remova o animal da lista
    animais.splice(animalIndex, 1);


    return res.send("Animal Removido");
});



// Testes endpoints filmes


server.get("/filmes", (req, res) => {
    return res.send(filmes)
})

server.listen(3001, () => {
    console.log("Servidor Rodando")
})
