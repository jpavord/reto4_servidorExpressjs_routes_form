const express = require('express')
const app = express();
const productos = require('./productos.js')

//MIDDLEWARE
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


//app.get('/', (req, res)=>{
//    res.sendFile(__dirname + '/index.html')
//})
app.use('/api', productos);

app.listen(8080, () =>{
    console.log("Servidor escuchando en el puerto 8080")
})

app.on("error", (error)=>{console.log(`error ${error}`)})