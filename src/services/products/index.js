import express from 'express'
import { Error } from 'mongoose'
import productModel from './model.js'

const productRouter = express.Router()

productRouter.post('/',async(req,res,)=>{
    try {
        const newProduct = new productModel(req.body)
        await newProduct.save()
        res.status(201).send(newProduct)
    } catch (error) {
        res.status(400).send(error)
    }
})

productRouter.get('/:id',async(req,res)=>{
    try {
        const product = await productModel.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(404).send(error)
    }
})

productRouter.put("/:id",async(req,res)=>{
    try {
       const updateProduct = await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).send(updateProduct) 
    } catch (error) {
        res.status(400).send(error)
    }
})

productsRouter.delete('/:id',async(req,res)=>{
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id)
        res.status(204).send('deleted')
    } catch (error) {
        res.status(400).send(error)
    }
})

export default productsRouter