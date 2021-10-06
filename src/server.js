import express from 'express'
import cors from 'cors'
import productRouters from './services/products/index.js'


const app  = express()

app.use(cors())
app.use(express.json())

app.get('/test',(req,res)=>{
    res.status(200).send({message:"test success"})
})

app.use("/products",productRouters)

export default app  