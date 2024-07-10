const {User} = require("../db/index");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    let username = req.headers.username;
    let password = req.headers.password;

    try {
        const user = await User.findOne({
            username, password
        }) 

        if(user) {
            return next();
        } else {
            return res.status(403).json({err : "User doesn't exist"})
        }
    } catch (error) {
        return res.status(403).json({err : "User doesn't exist"})
    }

}

module.exports = userMiddleware;