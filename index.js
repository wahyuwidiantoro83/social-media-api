require("dotenv").config()
const express = require("express")
const app = express()
const PORT =process.env.PORT||2000
const cors = require("cors")
const { accountsRouter } = require("./router")
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).send("<h1>ORM API is Running</h1>")
})

//define routers
app.use("/login", accountsRouter)

app.listen(PORT, ()=>{
    console.log("ORM API RUNNING", PORT);
})