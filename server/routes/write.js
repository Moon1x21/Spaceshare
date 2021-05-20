const express = require('express');
const router = express.Router();
const { Write } = require("../models/Write");
const db = require("../config/db");

const { auth } = require("../middleware/auth");

//=================================
//             write
//=================================

router.post('/uploadwrite', (req, res) => {
    //글 올리기

    const write = new Write(req.body)

    write.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
}
)

router.get('/getwrites', (req, res) => {
    //글 정보들 가져오기

    if (req.query.id) {
        Write.find({ writer: req.query.id})
            .populate('writer')
            .exec((err, writes) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, writes })
            })
    } else {
        Write.find()
            .populate('writer')
            .exec((err, writes) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({ success: true, writes })
            })
    }
})


router.post('/getwriteDetail', (req, res) => {
    //글 가져오기
    Write.findOne({ "_id": req.body.writeId })
        .populate('writer')
        .exec((err, writeDetail) => {
            if (err) return res.status(400).send(err)
            return res.status(200).json({ success: true, writeDetail })
        })
})


module.exports = router;
