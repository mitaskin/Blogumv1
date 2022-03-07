//Express: URL Yönlendirme için Kullanılıyor.
const express = require('express')

//Mongoose: (Object Document Model) Modülüdür. Modelleme işlemi yaptıroyor.
const mongoose = require('mongoose')

// Expressi app değişkenine atadık
const app = express()

//Veri şıkıştırma yöntemi olaarak cors kullandık.
const cors = require('cors');

//require ile url içindeki dosyayı app kısmına eklemiş olucak.
const blogs_routes = require('./routes/blogs.js')

//dotenv env dosyası içindeki verileri process.env şeklinde kullanımı sağlayarak bu kodların public paylaşılmasını engelliyor.
require('dotenv').config()

//mongoose vasıtasıyla mongoDB bağlantısını gerçekleştiriyoruz.
mongoose.connect(process.env.MONGO_URI)
    .then((result) => app.listen(5000)) //Eğer sonuç başarılı ise 5000 portunu dinleyecek
    .catch((err) => console.log(Error)) //Eğer error varsa err gönderecek

//verilerimin sıkıştırma türünü .json ayarla
app.use(cors())

//yönlendirme işlemleri yapıldı adres çubuğundaki veriler bu modul sayesinde proje içerisinde gerekli yerlere yönlendirilecek
app.use('/api/blogs', blogs_routes)