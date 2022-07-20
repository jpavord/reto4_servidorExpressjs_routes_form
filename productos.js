const express = require('express')
const { Router } = express

const productos = Router();

let array_productos = []

productos.get("/productos", (req, res)=>{
    res.status(200).json(array_productos)
})

productos.get('/productos/:id', (req, res)=>{
    const index = req.params.id
    const p = array_productos.find(item => item.id == index)
    if(!p){
        res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.status(200).json(p)
    console.log(p)
})

productos.post('/productos', (req, res)=>{
    try{
        let result = []
        if (array_productos.length == 0){
            const idNuevo = 1;
            const newProduct = {
                title: req.body.title,
                price: req.body.price,
                thumbnail: req.body.thumbnail,
                id: idNuevo
            };
            console.log(newProduct)
            array_productos.push(newProduct)
            //res.send('<h1 style="color: green"> INGRESO CORRECTO! </h1><br>')
            res.json({
                agregado: newProduct.title,
                id: newProduct.id
            })
        } else{
        for (const property in array_productos) {
            result = result.concat(`${array_productos[property].id}`)
        }
        const ultimoId = result[result.length -1]
        let idNuevo = parseInt(ultimoId, 10)+1
        const newProduct = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            id: idNuevo
        };
        console.log(idNuevo)
        array_productos.push(newProduct)
        res.status(201).json({
            agregado: newProduct.title,
            id: newProduct.id
        })
    }} catch(err){
        console.log(`Error,no se puede leer el archivo: ${err.message}`);
    }
})

productos.put('/productos/:id', (req, res)=>{
    const index = req.params.id - 1
    const p = array_productos.find(item => item.id == req.params.id)
    if(!p){
        res.status(404).json({
            error: "producto no encontrado"
        })
    }
    array_productos[index].title=req.body.title
    array_productos[index].price=req.body.price
    array_productos[index].thumbnail=req.body.thumbnail

    res.status(201).json(array_productos)
})

productos.delete('/productos/:id', (req, res)=>{
    const index = req.params.id - 1
    const p = array_productos.find(item => item.id == req.params.id)
    if(!p){
        res.status(404).json({
            error: "producto no encontrado"
        })
    }
    res.status(204).json({
        Titulo_Eliminado: array_productos[index].title,
        ID_Eliminado: array_productos[index].id
    })
    array_productos.splice(index, 1)

})

module.exports = productos


