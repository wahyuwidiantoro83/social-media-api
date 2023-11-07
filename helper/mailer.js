const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"drake.bling01@gmail.com",
        pass:"tvbduzzkjdqaqmql"
    }
})

module.exports = transporter