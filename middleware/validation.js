const jwt = require("jsonwebtoken")


module.exports={
    validateRegist : async (req, res, next) => {
        if (req.body.password.length >= 8 && req.body.password === req.body.confirmPassword) { next() }
        else {
            return res.status(400).send({ success: false, message: "Your password is not valid, please check" })
        }
    },
    validateToken : (req, res, next) => {
        try {
            if (!req.token) {
                return res.status(400).send({
                    success: false,
                    message: "You don't have account"
                })
            } else {
                const verifyData = jwt.verify(req.token, process.env.SCRT_TKN);
                if (!verifyData){
                    return res.status(401).send({
                        success : false,
                        message : "Unauthorized Request"
                    })
                } 
                req.userData = verifyData
                next()
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send("Invalid Token")
        }
    },
    validateRole : (req, res, next) => {
        try {
            console.log(req.token)
            const verifyData = jwt.verify(req.token, process.env.SCRT_TKN)
            if (verifyData.role === "promotor") {
                return res.status(400).send({
                    success: false,
                    message: "Unauthorized role"
                })
            } else {
                console.log("this is verify data", verifyData)
                req.userData = verifyData
                next();
            }
        } catch (error) {
            return res.status(500).send({
                success : false,
                message : error
            })
        }
    },
    authorizeUser : (req,res,next)=>{
        if(req.userData.role !== "user"){
            return res.status(400).send("Unauthorized to feature")
        }
        else {
            next()
        }
    },
    authorizePromotor : (req,res,next)=>{
        if(req.userData.role !== "promotor"){
            return res.status(400).send("Unauthorized to feature")
        }
        else {
            next()
        }
    }
}