const jwt = require('jsonwebtoken');

const JwtHelper = (function () {

    function readToken(req) {
        const authHeader = req?.headers?.authorization;
        if (!authHeader) {
            return null;
        }

        const token = authHeader.split(' ')[1]; // Extract the token from the header

        return token;
    }

    function generateToken(payload, secretKey, expiresIn) {
        let options = {
            expiresIn
        };

        return jwt.sign(payload, secretKey, options);
    }

    function verifyToken(req, secretKey) {
        return new Promise((resolve, reject) => {
            try {
                let token = readToken(req);

                if (!token) {
                    reject("Token is invalid");
                }

                jwt.verify(token, secretKey, (err, decoded) => {
                    if (err) {
                        reject(err);
                    }

                    resolve(decoded);
                });
            } catch (error) {
                // Token is invalid or has expired
                console.error(error);
                reject(error);
            }
        })
    }

    function decodeToken(token) {
        return jwt.decode(token);
    }

    return {
        readToken,
        generateToken,
        verifyToken,
        decodeToken
    };
}());

module.exports = JwtHelper;