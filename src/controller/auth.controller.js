const UserModel = require("../models/db_config").user;
const randomString = require("randomstring");
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const response = require("../helper/response");
const bcrypt = require("bcryptjs");
const jwtHelper = require("../helper/jwt.helper");

const {validateLogin, validateRegister} = require("../helper/validator")

class AuthController {
    async login(req, res) {
        try {
            const err = validateLogin.validate(req.body);
            if (!err) {
                console.log(err)
                return response.validationErrorWithData(res, err.error, "")
            }
            const username = req.body.username || "test";
            const password = req.body.password || "12345";

            let data = await UserModel.findAll({
                where: {
                    username: username,
                },
            });

            if (data.length === 0) {
                return response.ErrorResponse(res, "Ten dang nhap khong ton tai!");
            }
            const isPasswordValid = await bcrypt.compare(password, data[0].password);

            if (!isPasswordValid) {
                return response.ErrorResponse(res, "Mat khau k chinh xac!");
            }

            let user = {
                id: data[0].id,
                username: data[0].userName,
                keyApi: data[0].keyApi,
                refreshToken: data[0].refreshToken,
            };
            return response.successResponseWithData(res, "Success", user);
        } catch (e) {
            console.log(e);
            return response.ErrorResponse(res, "Something went wrong!");
        }
    }

    async register(req, res) {
        try {
            // if (req.body != null) return response.ErrorResponse(res, "not null field")
            const salt1 = await bcrypt.genSalt(12);
            const key = await randomString.generate(20);
            const srect = await bcrypt.hash(key, salt1);
            // console.log(srect);
            await validateRegister.validate(req.body)

            const user = await UserModel.findAll({
                where: {
                    username: req.body.userName,
                },
            });
            if (user.length > 0)
                return response.ErrorResponse(res, "Tai khoan da ton tai!");

            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const keyApi = await randomString.generate(20);
            const refreshToken = await randomString.generate(30);

            const userCre = await UserModel.create({
                userName: req.body.userName,
                password: hashPassword,
                email: req.body.email,
                fullName: req.body.fullName,
                keyApi: keyApi,
                refreshToken: refreshToken,
            });

            if (userCre) {
                let token = await jwtHelper.signToken(userCre.id, SECRET_KEY)
                let resData = {
                    id: userCre.id,
                    username: userCre.userName,
                    keyApi: userCre.keyApi,
                    updatedAt: userCre.updatedAt,
                    createdAt: userCre.createdAt,
                };
                res.setHeader("auth-token", token)
                return response.successResponseWithData(res, "success", resData);
            } else {
                return response.ErrorResponse(res, "Co loi khi tao tai khoan");
            }
        } catch (e) {
            return response.ErrorResponse(res, e.message);
        }
    }
}

module.exports = new AuthController();
