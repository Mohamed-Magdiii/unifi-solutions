const router =require("express").Router()
const todoRoutes = require("./todo.routes")

router.use('/todos' , todoRoutes)


module.exports= (app) =>{
    app.use("/api/v1" , router)
}