const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!")
}

app.set('views' , path.join(__dirname , 'views'))
app.set('view engine' , 'ejs')

app.listen(3000 , () => {
    console.log("PORT 3000 Started!")
})

app.get('/dogs' , (req,res) => {
    res.send("WOOF!!")
})