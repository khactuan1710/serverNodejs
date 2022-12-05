const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY
const response = require("../helper/response")
const userModel = require("../models/db_config").user

module.exports = async (req, res, next) => {
    const authToken = req.headers['auth-token'];
    if (!authToken) {
        return response.ErrorResponse(res, "Token invalid")
    }
    // console.log(authToken)
    try {
        jwt.verify(authToken, jwtSecret, function (err, decode) {
            if (err) {
                return response.ErrorResponse(res, err.message)
            } else {
                next()
            }
        })
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return response.ErrorResponse(res, error.message)
    }
}
