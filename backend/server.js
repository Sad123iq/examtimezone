const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

const productSchema = new mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    count:Number,
    totalPrice:Number
})

const products = mongoose.model("Product",productSchema)

app.get("/api/products", async (req,res)=>{
    const resp = await products.find()
    res.send(resp)
})

app.get("/api/products/:id",async (req,res)=>{
    const {id} = req.params
    const resp = await products.findById(id)
    res.send(resp)
})

app.post("/api/products", async (req,res)=>{
    const {title,image,price} = req.body
    const newProduct = await new product(req.body)
    newProduct.save()
    res.send("Item Created")
})

app.put("/api/products/:id", async (req,res)=>{
    const {id} = req.params
    const resp = await products.findByIdAndUpdate(id,{...req.body})
    res.send("Item Updated")
})

app.delete("/api/products/:id", async (req,res)=>{
    const {id} = req.params
    const resp = await products.findByIdAndDelete(id)
    res.send("Item deleted")
})


mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(res => {console.log("DB CONNECTED")})
    .catch(err => {console.log("db not connected")})


app.listen(process.env.PORT, (res)=>{
    console.log("Port running on 8080")
})