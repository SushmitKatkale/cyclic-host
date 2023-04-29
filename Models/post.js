const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const FILE_PATH = path.join('/uploads/postFiles');

const postSchema = mongoose.Schema({
    postContent: {
        type: String,
    },
    postFile: {
        type: String,
    },
    postFileExtention: {
        type: String,
        default: ""
    },
    postDate: {
        type: String,
        required : true
    },
    postLocation: {
        type: String,
        default: ""
    },
    postType: {
        type: String
    },
    postComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    postUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
},{
    timestamps: true
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname + '/..' + FILE_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

//statics
postSchema.statics.uploadFile = multer({storage: storage}).single('file');
postSchema.statics.filePath = FILE_PATH;

const post = mongoose.model('post',postSchema);

module.exports = post;