const { json } = require('express/lib/response');
const mongoose = require('mongoose');
const Blog = require('../models/blogs.js')
const print = require('./konsolayazdir.js');

const getBlogs = ((req, res) => {
    Blog.find({})
        .then(result => {

            // let data = []
            // result.map(x => {
            //     data.push({
            //         title: x.title ? x.title : null,
            //         tag:x.tag,
            //         text1:x.text || null
            //     })
            // })
            // res.status(200).json({ data })
            res.status(200).json({ result })
        })
        .catch(error => res.status(500).json({ msg: error }))
})

const getBlog = ((req, res) => {

    // print.consoleLog("getblog tayız")

    Blog.findOne({ _id: req.params.blogID })
        .then(result => res.status(200).json({ result }))
        .catch(() => res.status(404).json({ msg: 'Blog not found' }))
})

const createBlog = ((req, res) => {
    // if (req.body) {
    //     if (req.body.tag && req.body.tag.length > 0) {
    //         //Tag Varsa
    //         if (req.body.title && req.body.title.length > 0) {
    //             //Title varsa
    //             if (req.body.text && req.body.text.length > 0) {
    //                 //text varsa
    //                 Blog.create(req.body)
    //                     .then(result => res.status(200).json({ result: result,msg:"Yükleme Başarılı" }))
    //                     .catch((error) => res.status(500).json({ msg: error }))
    //             } else {
    //                 //text yok
    //                 res.json({
    //                     result: null,
    //                     msg: "Text Alanını Doldurun !"
    //                 })
    //             }
    //         } else {
    //             //title yok
    //             res.json({
    //                 result: null,
    //                 msg: "Title Alanını Doldurun !"
    //             })
    //         }
    //     } else {
    //         //Tag Yok ise
    //         res.json({
    //             result: null,
    //             msg: "Tag Alanını Doldurun !"
    //         })
    //     }
    // }

    req.body._id = mongoose.Types.ObjectId()
    Blog.create(req.body)
        .then(result => res.status(200).json({ result: result, msg: "Yükleme Başarılı" }))
        .catch((error) => res.status(500).json({ msg: error }))

})

const updateBlog = ((req, res) => {
    Blog.findOneAndUpdate({ _id: req.params.blogID }, req.body, { new: true, runValidators: true })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Blog not found' }))
})

const deleteBlog = ((req, res) => {
    Blog.findOneAndDelete({ _id: req.params.blogID })
        .then(result => res.status(200).json({ result }))
        .catch((error) => res.status(404).json({ msg: 'Blog not found' }))
})

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog
}