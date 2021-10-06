import mongoose from 'mongoose'
import ProductSchema from './schema.js'
const {model} = mongoose

const productModel = model('products',ProductSchema)

export default productModel