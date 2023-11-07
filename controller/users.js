const { users } = require("../models");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const transporter = require("../helper/mailer");

module.exports = {
    register: async (req, res, next) => {
        try {
            console.log("check data from client", req.body);

            //Lanjut register
            const isExist = await users.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (isExist) {
                return res.status(400).send({
                    success: false,
                    message: "Email already used"
                })
            }
            delete req.body.confirmPassword
            //  HASH PASSWORD
            const salt = await bcrypt.genSalt(10) // membuat salt atau value tambahan untuk hashpassword biasanya 10
            console.log("salt", salt);
            const hashPassword = await bcrypt.hash(req.body.password, salt) // melakukan hashpassword
            console.log("hashPassword", hashPassword);
            req.body.password = hashPassword //reassign password menjadi hashpassword

            const result = await users.create(req.body)

            const token = jwt.sign({
                id: result.id,
                email: result.email
            },
                process.env.SCRT_TKN,
                {
                    expiresIn: "1h"
                }
            )

            // SEND EMAIL REGISTRATION
            await transporter.sendMail({
                from: "We Are Admin",
                to: req.body.email,
                subject: "Registration Info",
                html: `<h1>Hello, ${req.body.username}, your registration SUCCESS</h1>
                <a href="http://localhost:5173/verify?${token}">CLICK LINK</a>`
            })

            return res.status(201).send({
                status: true,
                message: "Register Success"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    //Login yang dijadikan patokan adalah id, role, isVerified. lalu yang disimpan dalam keepLogin adalah id yang sudah dalam bentuk token
    login: async (req, res, next) => {
        try {
            const result = await users.findOne({
                where: {
                    email: req.body.email,
                    // password : req.body.password
                    // password tidak perlu sebab sudah di hashing jadi pasti tidak sama
                },
                raw: true // untuk  mendapatkan data raw dalam result
                // attributes:{
                //     exclude:["password"]
                // }
            })
            const isValid = await bcrypt.compare(req.body.password, result.password) //compare body password dengan result (DB) password
            console.log("isValid", isValid);
            console.log("result", result);
            if (isValid) {
                // delete result.dataValues.password
                // delete result.password

                // GENERATE TOKEN untuk ID, ROLE, isVERIFIED
                console.log("ini adalah log", { id: result.id, role: result.role, isVerified: result.isVerified })

                // const token = jwt.sign({id:result.id, role:result.role, isVerified:result.isVerified},process.env.SCRT_TKN) // iNI Membuat token dengan syntax  sign (diisi oleh property yang hendak di enkripsi), ditambah dengan secret token ini versi tanpa raw:true
                const { id, username, email, phone, role, isVerified } = result
                const token = jwt.sign({ id, role, isVerified }, process.env.SCRT_TKN, { expiresIn: "1h" }) // 
                // console.log("ini hasilnya",{id, role, isVerified},process.env.SCRT_TKN) // 
                // console.log("result", result);
                return res.status(200).send({
                    success: true,
                    result: {
                        username,
                        email,
                        phone,
                        isVerified,
                        token
                    }
                })

            } else {
                return res.status(401).send({
                    success: false,
                    message: "you unauthicated"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
           
        }
    },

    verifyUser : async(req,res,next)=>{
        try {
            const result = jwt.verify(req.query, process.env.SCRT_TKN)
            await users.update({
                isVerified : true
            },
            {
                where : {
                    id:req.userData.id // userData ini didapat dari middleware penerjemahan token
                }
            })
            return res.status(200).send({
                success : true,
                message : "Verification account Success"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },

    keepLogin: async (req, res, next) => {
        try {
            // const verifyData = jwt.verify(req.token, process.env.SCRT_TKN)//userData dari router user
            const result = await users.findOne({
                where: {
                    id: req.userData.id
                },
                raw: true
            })
            // console.log(verifyData);
            const { id, username, email, phone, role, isVerified } = result
            const token = jwt.sign({ id, role, isVerified }, process.env.SCRT_TKN, { expiresIn: "1h" })
            return res.status(200).send({
                success: true,
                result: {
                    username,
                    phone,
                    isVerified,
                    email
                }
            })
            
        } catch (error) {
            console.log(error);
        }
    },

}