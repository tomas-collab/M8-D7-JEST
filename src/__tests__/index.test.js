import supertest from "supertest";
import app from "../server.js";
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { afterAll, beforeAll, describe, it } from "jest-circus";

dotenv.config()

const request = supertest(app)

describe("Testing the testing environment",()=>{
    it("should test that true is true", ()=>{
        expect(true).toBe(true)
    })
})

describe("Testing the server",()=>{
    beforeAll(done=>{
        mongoose.connect(process.env.MONGO_URL_TEST)
        .then(()=>{
            console.log("connected to Atlas")
            done()
        })
    })
    afterAll(done=>{
        mongoose.connection.dropDatabase().then(()=>{
            console.log("test DB dropped")
            mongoose.connection.close().then(()=>{
                done()
            })
        })
    })

    test("should test that the /test endpoint is ok",async()=>{
        const response = await request.get('/test')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe("test success")
    })

    it("should test that a /non existent endpoint is returning 404", async () => {
        const response = await request.get('/not-existing')

        expect(response.status).toBe(404)
    })

    const validProduct = {
        name: 'iPhone',
        price: 900
    }

    it("should test that a POST /products is returning us a valid product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

    })

    const invalidProduct = {
        price: 900
    }

    it("should test that a POST /products is returning us an error with an invalid body", async () => {
        const response = await request.post('/products').send(invalidProduct)

        expect(response.status).toBe(400)
        expect(response.body._id).not.toBeDefined()

    })

    it("should test that a GET /products endpoint is returning a valid product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const idResponse = await request.get('/products/' + response.body._id)
        expect(idResponse.body.name).toEqual(validProduct.name)
    })

    it("should test that the /products endpoint is returning an updated product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const idResponse = await request.put('/products/' + response.body._id)
        expect(idResponse.body.name).toEqual(validProduct.name)
        expect(typeof idResponse.body.name).toBe('string')
    })

    it("should test that the /products endpoint is returning a valid response to a deleted product", async () => {
        const response = await request.post('/products').send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const idResponse = await request.delete('/products/' + response.body._id)
        expect(idResponse.status).toBe(204)
    })
})