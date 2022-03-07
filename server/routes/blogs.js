const express = require('express')
const router = express.Router()

const  { 
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog 
} = require('../controllers/blogs.js')

//GET:Verileri Çekmek
//POST:Veri Yükleme
//PUT:Veri Güncelleme
//DELETE:Veri Silme

router.get('/', getBlogs)       //Tarayıcı işlemi

router.get('/:blogID', getBlog) //Tarayıcı işlemi

router.post('/', createBlog) 

router.put('/:blogID', updateBlog) 

router.delete('/:blogID', deleteBlog)

module.exports = router
