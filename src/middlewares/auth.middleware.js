const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


async function authUser(req, res, next) {

    try {

        const { token } = req.cookies

        if (!token) {
            return res.status(401).json({
                message: "User unauthenticated"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const User = await userModel.findById(decode.id)

        req.user = User

        next()

    } catch (err) {
        return res.status(500).json({
            message: "Error while verifying authentication",
            error: err.message
        })
    }

}


module.exports = { authUser }