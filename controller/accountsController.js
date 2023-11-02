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
    }
}