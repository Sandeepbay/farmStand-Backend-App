const mongoose = require('mongoose')
const Product = require('./models/product')

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmStand');
  console.log("Connection open!!")
}


// const p = new Product({
//     name : 'Apple',
//     price : 60,
//     category : 'fruit'
// })

// p.save()
//     .then(msg => {
//         console.log(msg)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name : "Tomato",
        price : 80,
        category : 'vegetables'
    },
    {
        name : "Amul Milk",
        price : 23.5,
        category : 'diary'
    },
    {
        name : "Cucumber",
        price : 50,
        category : 'fruit'
    },
    {
        name : "Broccoli",
        price : 60,
        category : 'vegetable'
    },
    {
        name : "Coke 600ml",
        price : 80,
        category : 'diary'
    }
]

Product.insertMany(seedProducts)
    .then(msg => {
    console.log(msg)
    })
    .catch(e => {
        console.log(e)
    })