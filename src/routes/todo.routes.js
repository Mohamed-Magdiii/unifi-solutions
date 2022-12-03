const router = require("express").Router()
const ctr = require('../controller/todo.controller')
const { validationMiddleware } = require("./middleware")
const {create}  = require("./validations/todos")

// router.get("/" , ctr.getRecords)

router.post("/" ,validationMiddleware(create), ctr.createRecord)


router.get("/:id" , ctr.getRecordById)

router.delete("/:id" , ctr.deleteRecord)


router.patch("/:id" , ctr.updateRecord)




module.exports = router