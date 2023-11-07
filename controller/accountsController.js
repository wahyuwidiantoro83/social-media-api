const { accounts } = require("../models")

module.exports={
    createData: async(req,res,next)=>{
        try {
            const checkData = await accounts.findAll({
                where: {
                    username: req.body.username,
                    email: req.body.email
                },
            });
            console.log(checkData);
            if(checkData.length > 0){
                throw {
                    rc: 400,
                    success: false,
                    message: "Account is exist",
                }
            } else if(req.body.password !== req.body.passwordConfirm) {
                throw {
                    rc: 400,
                    success: false,
                    message: "Account wrong"

                }
            } else if(req.body.password < 8) {
                throw {
                    rc: 400,
                    success: false,
                    message: "password is insufficient"
                }
            }
            else {
                const result = await accounts.create(req.body);
                return res.status(201).send({
                    rc: 201,
                    success: true,
                    message: "Account successfully added",
                    data: await accounts.findAll()
                });
            }
            const result = await accounts.create(req.body);
            return res.status(201).send(result);
        } catch (error) {
            console.log(error);
            return res.status(error.rc || 500).send(error)
        }
    },
    register : async(req,res,next)=>{
        try {
            console.log("check data from client", req.body);
            if(req.body.password.length>=8 && req.body.password === req.body.confirmPassword){
                //Lanjut register
                const isExist = await accounts.findOne({
                    where : {
                        email:req.body.email
                    }
                })
                if(isExist) {
                    return res.status(400).send({
                        success:false,
                        message : "Email already used"
                    })
                }
                delete req.body.confirmPassword
                await accounts.create(req.body)
                return res.status(201).send({
                    status : true,
                    message : "Register Success"
                })
            } else {
                return res.status(400).send({
                    success : false,
                    message : "Password error"
                })
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }
    },
    login : async(req,res,next)=>{

    },

}