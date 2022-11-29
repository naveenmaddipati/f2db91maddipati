const mongoose = require("mongoose")
const applicationSchema = mongoose.Schema({
    App_Name: {
        type:String,
        required:true
    },
    App_Company:{
        type: String,
        required:true 
    },
    App_Size:{
        type: Number,
        required:true,
        min:1,
        max:310
    }, 
     App_Rating:{
        type: Number,
        required:true,
        min:0,
        max:10
    
    }, 
    App_Category: {
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Application",applicationSchema)