const accounts = require ("../models")

module.exports = {
    getLoginData : async (req,res,next) => {
        const checkUser = await accounts.findAll({
            where:{username:req.body.username} || {email:req.body.email} || {phone:req.body.email}
        })
    }
}