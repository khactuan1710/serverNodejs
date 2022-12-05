const jwt = require('jsonwebtoken')

exports.signToken = (id, secretSignature) => {
    try {
        return jwt.sign({
                iss: "admin",
                sub: id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 3)
            },
            secretSignature);
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

// exports.verifyToken = (token, secretKey) => {
//     try {
//         jwt.verify(token, secretKey, function (err) {
//             if (err) {
//                 return err;
//             }
//         })
//     } catch (error) {
//         console.log(`Error in generate access token:  + ${error}`);
//         return null;
//     }
// };