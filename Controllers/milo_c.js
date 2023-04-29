const post = require('../Models/post');
const comment = require('../Models/comment');
const user = require('../Models/user');

module.exports.home = (req,res) => {
    post.find({})
    .sort('-createdAt')
    .populate({
        path: 'postUser'
    })
    .populate({
        path: 'postComments',
        populate: {
            path: 'commentUser'
        }
    })
    .then((val) => {
        // console.log(val);
        return res.render('./milo/home',{
            posts: val
        });
    }).catch(err => {
        console.log("Error", err);
    })
    
}

module.exports.saved = (req,res) => {
    return res.render('./milo/saved');
}

module.exports.addPost = (req,res) => {
    return res.render('./milo/addPost');
}

module.exports.messages = (req,res) => {
    return res.render('./milo/messages');
}

module.exports.games = (req,res) => {
    return res.render('./milo/games');
}

module.exports.addNewPost = async(req,res) => {
    try{
        let date = new Date();
        let p = await post.uploadFile(req,res,function(err){
            if(err){
                console.log("--------------------"+err);
            }
            if(req.file){
                post.create({
                    postContent: req.body.postContent,
                    postFile: post.filePath + '/' + req.file.filename,
                    postDate: date.toLocaleDateString(),
                    postType: req.body.postType,
                    postUser: req.user,
                    postFileExtention: req.file.mimetype.substring(0,5)
                })
            }
        })

        if(req.xhr){
            return res.status(200).json({
                data: {
                    post: p
                },
                message: "New post created!"
            })
        }

        return res.redirect('back');

    }catch(err){
        console.log("Error", err);
    }
}

module.exports.addComment = async(req,res) => {
    try{

        let currPost = await post.findById(req.query.pid);

        let date = new Date();
        let newComment = await comment.create({
            commentContent: req.body.commentContent,
            commentDate: date.toLocaleDateString(),
            commentUser: req.user,
            onPost: currPost
        });

        let p = await post.findOneAndUpdate({_id: req.query.pid},{
            $push: {
                postComments: newComment
            }
        });

        return res.redirect('back');
    }catch(err){
        console.log("Error",err);
    }
}

module.exports.deleteComment = async(req,res) => {
    try{
        let p = await post.findById(req.query.pid);
        let c = await comment.findById(req.query.cid);
        if(p.postUser._id.toString() != req.user._id.toString() && p.postUser._id.toString() != c.commentUser._id.toString()){
            return res.redirect('back');
        }
        await post.findOneAndUpdate({_id: req.query.pid},{
            $pull: {
                postComments: c._id
            }
        });
        await comment.findByIdAndDelete(c);
        
        return res.redirect('back');

    }catch(err){
        console.log("Error",err);
    }
}

module.exports.deletePost = async(req,res) => {
    try{
        let p = await post.findById(req.query.pid);

        if(p.postUser._id.toString() != req.user._id.toString()){
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }

        for (let i = 0; i < p.postComments.length; i++) {
            const element = p.postComments[i];
            let c = await comment.findByIdAndDelete(element);
        }

        await post.findByIdAndDelete(p);
        return res.redirect('back');

    }catch(err){

        console.log("Error",err);

    }
}