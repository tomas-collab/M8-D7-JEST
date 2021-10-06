import app from "./server.js";
import mongoose from "mongoose"

const port = process.env.PORT || 3031
const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("🥭connected to mongoDB🥭")
    app.listen(port,()=>{
        console.log("server listening on port:",port)
    })
})