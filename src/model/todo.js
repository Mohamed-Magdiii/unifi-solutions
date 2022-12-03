const {model, Schema} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')
const TodoSchema = Schema({
    todo : {type:String, required:true},
    description: {type:String},
    completed:{type:Boolean, default:false}
},
{timestamps: true}
)

TodoSchema.plugin(mongoosePaginate);


module.exports.Model = model('todos' , TodoSchema)
module.exports.Schema = TodoSchema


