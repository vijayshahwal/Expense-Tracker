const jwt = require("jsonwebtoken");

exports.Auth = (req, res, next) => {
    try {
        const token = req.body.token || 
        (req.cookies ? req.cookies.token : null) || 
        req.header["Authorization"];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token Missing", 
            });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid",
            });
        }
        
        next();

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token",
            error: err.message,
        });
    }
}
