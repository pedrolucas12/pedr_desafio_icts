const express = require ('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Pedro@10",
    database: "desafio",
});

app.post('/create', (req, res) => {
    const nome = req.body.nome
    const descricao = req.body.descricao
    const preco = req.body.preco

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const dtCriacao = date;

    db.query(
        "INSERT INTO produto (nome, descricao, preco, dt_criacao) VALUES (?,?,?,?)",  
        [nome, descricao, preco, dtCriacao], 
        (err, result) => {
            if (err){
                console.log(err)
            } else {
                res.send("Produto cadastrado com sucesso!")
            }
        }
    ); 
});

app.get("/produtos", (req, res) => {
    db.query("SELECT * FROM produto", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.put('/produto/', (req, res) => {
    const id = req.body.id

    const nome = req.body.nome
    const descricao = req.body.descricao
    const preco = req.body.preco

    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const dtAtualizacao = date;

    db.query(
        "UPDATE produto SET nome=?, descricao=?, preco=?, dt_atualizacao=? WHERE id = ?",
        [nome, descricao, preco, dtAtualizacao, id], 
        (err, result) => {
            if (err){
                console.log(err)
            } else {
                res.send("Produto atualizado com sucesso!")
            }
        }
    ); 
});

app.delete('/produto/', (req, res) => {
    const id = req.body.id

    db.query(
        "DELETE FROM produto WHERE id = ?",
        [id], 
        (err, result) => {
            if (err){
                console.log(err)
            } else {
                res.send("Produto deletado com sucesso!")
            }
        }
    ); 
});


app.listen(3001, () => {
    console.log("Servidor funcionado na porta 3001");
});
