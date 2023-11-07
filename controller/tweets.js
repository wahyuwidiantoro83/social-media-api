const { tweets, users } = require("../models")
const fs = require("fs")

module.exports = {
    createTweet: async (req, res, next) => {
        try {
            // console.log(req);
            // MENYIMPAN GAMBAR DALAM DB HANYA NAMA GAMBARNYA SAJA
            const result = await tweets.create({
                userId: req.userData.id,
                tweet: req.body.tweet,
                img: req.file.filename
            })

            return res.status(200).send({
                success: true,
                result
            })
        } catch (error) {
            console.log(error);
            fs.unlinkSync(`${req.file.path}`) // Guna menghapus gambar jika salah upload
            return res.status(500).send({
                success: false,
                message: "Error create tweet"
            })
        }
    },
    getTweet: async (req, res, next) => {
        try {
            const result = await tweets.findAll({
                include: [{ // ini untuk join tabel
                    model: users,
                    required : true,
                    attributes : ["username", "email"] //cuma butuh kolom username dan email dari tabel user
                }]
            })
            console.log(result);
            return res.status(200).send(result)
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success : false,
                message : "Error get tweet",
                error
            })
        }
    }
}