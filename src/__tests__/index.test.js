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

    it()
})