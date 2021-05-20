const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    writer: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postId: {
        type:Schema.Types.ObjectId,
        ref:'Write'
    },
    responseTo:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    content: {
        type: String
    }
}, {timestamp: true});

const CommentW = mongoose.model('CommentW',commentSchema);

module.exports = { CommentW }