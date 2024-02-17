//mongo db schema for storring admin logs//
const mongoose = require('mongoose');
const { Schema } = mongoose;
const InfoSchema = new Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Admin'
    },
    title:{
        type: String,
        require : true,
        
    },
    description : {
        type: String,
        require : true,
    },

    
    Date :{
        type: Date,
        default : Date.now
        
    },
});
module.exports = mongoose.model('info',InfoSchema);