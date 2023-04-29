const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    commentContent: {
        type: String,
    },
    commentDate: {
        type: String,
        required : true
    },
    commentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    onPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
},{
    timestamps: true
});

const comment = mongoose.model('comment',commentSchema);

module.exports = comment;