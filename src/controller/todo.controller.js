const { ApiResponse } = require("../utils");
const { ResponseMessages } = require("../common");
const responseMessage = require("../common/response-message");
const srv= require('../service').todoService

class TodoController {
    // async getRecords(req,res,next){
    //     try {
    //         const result=  await srv.findWithPagination()
    //         return ApiResponse(res,true,ResponseMessages.RECORD_FETCH_SUCCESS,result)   
    //     } catch (error) {
    //             next(error)
    //     }
    // }
    async createRecord(req,res,next){
        try {
            const params = req.body
        const result=  await srv.create(params)
        return ApiResponse(res,true,responseMessage.RECORD_CREATE_SUCCESS , result)
        } catch (error) {
            next(error)
        }
    }
    async getRecordById(req,res,next){
        try {
            const {id} = req.params
        const result=  await srv.findById(id)
        return ApiResponse(res,true,responseMessage.RECORD_FETCH_SUCCESS, result)
        } catch (error) {
            next(error)
        }
    }
    async deleteRecord(req,res,next){
        try {
            const {id} = req.params
            const result=  await srv.deleteById(id)
            return ApiResponse(res,true,responseMessage.RECORD_DELETE_SUCCESS, result)
        } catch (error) {
            next(error)
        }
    }
    async updateRecord(req,res,next){
        try {
            const {id} = req.params
            const result=  await srv.updateById(id , req.body)
            return ApiResponse(res,true,responseMessage.RECORD_DELETE_SUCCESS, result)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new TodoController()