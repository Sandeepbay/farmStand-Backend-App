const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!")
}

app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')

const categories = ['Fruit' , 'Vegetable' , 'Drinks']

app.listen(3000 , () => {
    console.log("PORT 3000 Started!")
})

app.get('/products' , async (req,res) => {
    const products = await Product.find({})
    res.render('products/index.ejs' , { products })
})

app.post('/products' , async (req,res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/new', (req,res) => {
    res.render('products/new.ejs' , { categories })
})

app.get('/products/:id' , async (req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/show.ejs' , { product })
})

app.get('/products/:id/edit', async (req,res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('products/edit.ejs' , { product , categories})
})

app.put('/products/:id' , async (req,res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id , req.body , { runValidators : true , new : true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id' , async(req,res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})



