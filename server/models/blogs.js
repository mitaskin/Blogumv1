//mongoose bu bölgeye eklendi.
const mongoose = require('mongoose')

//mongoose ile bir veri şeması oluşturduk bu şemayı BlogSchema olarak ayarladık.
const BlogSchema = new mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    title: { type: String, required: [true, 'Başlık Zorunludur.'] },
    tag: { type: String, required: [true, 'Tag Zorunludur.'] },
    text: { type: String, required: [true, 'Text Zorunludur.'] }
})

//MongoDB de posts adında geçen tabloyu BolgSchemaya aktardık ve buna blog adını verdik.
const Blog = mongoose.model('posts', BlogSchema)

//Blog adını dışarıya aktararak diğer modüller tarafından kullanılmasını amaçladık.
module.exports = Blog