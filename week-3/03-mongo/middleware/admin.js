const {Admin} = require("../db/index");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let username = req.headers.username;
    let password = req.headers.password;


    try {
        const admin = await Admin.findOne({
            username, password
        }) 

        if(admin) {
            next();
            return;
        } else {
            return res.status(403).json({err : "Admin doesn't exist"})
        }
        

    } catch (error) {
        return res.status(403).json({err : "Admin doesn't exist"})
    }

}

module.exports = adminMiddleware;