import express from 'express'
import cors from 'cors'



const app  = express()

app.use(cors())
app.use(express.json())

app.get('/test',(req,res)=>{
    res.status(200).send({message:"Test success"})
})

app.use("/products",productsRouter)

export default app