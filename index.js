const express = require('express');
const db = require('./db')
const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/teste2', (req, res) => {
  res.send('testado com sucesso!')
})
app.get('/prontuarios',async (req, res) => {
 try {
    const [rows]=await db.execute("SELECT * FROM pacientes");
    res.status(200).json(rows);
 } catch (error) {
    res.status(500).json({
        mensagem:"erro interno do servidor!",
        detalhes: error.menssage 
    });
 }
})
app.get('/paciente/:id',async (req, res) => {
    const {id}= req.params;//pegar o parametro do id
 try {
    const [rows]=await db.execute("SELECT * FROM `pacientes` WHERE id = ?",[id]);
    if(rows.length===0){
        return res.status(404).json("paciente não encontrado");
    }
    res.status(200).json(rows[0]);
 } catch (error) {
    res.status(500).json({
        mensagem:"erro interno do servidor!",
        detalhes: error.menssage 
    });
 }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})