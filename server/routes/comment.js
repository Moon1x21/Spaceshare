const express = require('express');
const router = express.Router();
const { CommentW } = require("../models/Comment");
const db = require("../config/db");

const { auth } = require("../middleware/auth");
//=================================
//             Comment
//=================================

router.post('/saveComment',(req, res) =>{
    //댓글 올리기
    const {writer, postId, responseTo, content} = req.body;
    db.query("insert into comment () values (? ,? ,? )",[writer, postId, responseTo, content],
    (err, result)=>{
        if(err){
            return res.json({success:false, err})
         } else {
            db.query("select * from comment c left join user u on c.writer = u.id where c.id= ?",[],(err,result)=>{
                res.status(200).json({success: true, result});
            })
         }

    });

    const commentw = new CommentW (req.body)
    commentw.save((err,commentw)=>{
        if(err) return res.json({success:false, err})

        CommentW.find({'_id':commentw._id})
            .populate('writer')
            .exec((err,result)=>{
                if(err) return res.json({success:false, err})
                res.status(200).json({success: true, result})
            })
    })

});

router.post('/getComments',(req, res) =>{
    //댓글 가져오기
    CommentW.find({"postId":req.body.writeId})
    .populate('writer')
    .exec((err,commentws)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true,commentws})
    })
    
});



module.exports = router;