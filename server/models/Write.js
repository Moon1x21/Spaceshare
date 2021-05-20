const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const writeSchema = mongoose.Schema({
    writer: {
       type: Schema.Types.ObjectId,
       ref: 'User'
    },
    title : {
       type:String,
       maxlegth: 50
    },
    description : {
       type: String 
    },
    address :{
        type: String
    }, 
    people :{
        type: Number
    },
    date : {
        type: String
    }
}, {timestamp: true});

const Write = mongoose.model('Write',writeSchema);

module.exports = { Write }
