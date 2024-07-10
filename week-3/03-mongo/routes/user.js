const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const {username , password} = req.body;

    User.create({
        username,password
    }).then((user)=> {
        return res.status(200).json({message : "user created successfully."})
    }).catch((err)=> {
        return res.status(403).json({"error" : "cannot create user record."})
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then((courses)=>{
        return res.status(200).json({courses});
    })
    .catch((err)=>{
        return res.status(404).json({err : "cannot get courses."})
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic

    const courseId = req.params.courseId;
    const username = req.headers.username;

    User.updateOne({username},{$push : {purchasedCourses : courseId}})
    .then((user)=> {
        return res.status(200).json({message : "course purchased successfully",user})
    })
    .catch((err)=> {
        return res.status(403).json({"err" : "cannot purchase the course"})
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const username = req.headers.username;
    const user = await User.findOne({username});
    const purchasedCoursesId = user.purchasedCourses;

    const courses = await Course.find({
        _id : {
            $in : purchasedCoursesId
        }
    })

    console.log(courses);
    return res.status(200).json(courses);
});

module.exports = router