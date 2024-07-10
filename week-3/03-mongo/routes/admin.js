const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    try {
        const admin = Admin.create({
            username,
            password
        });
        res.status(200).json({message : "Admin created successfully"})
    } catch (err) {
        return res.status(403).json({err : "cannot create admin."})
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const {title,description,imageLink,price} = req.body;
    const newCourse = await Course.create({title,description,imageLink , price});
    if(newCourse) {
        return res.status(200).json({message: "course created successfully" , courseId : newCourse._id});
    }
    return res.status(403).json({msg : "cannot create courses"});

});

router.get('/courses', adminMiddleware,async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    
    res.status(200).json({courses});
});

module.exports = router;