const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const mongoose = require("mongoose");

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT = 3000;



async function startServer() {
     try {
        await mongoose.connect("mongodb+srv://padfoot:padfoot@session.mo45vqi.mongodb.net/?retryWrites=true&w=majority&appName=user-app");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
     } catch (error) {
        console.log("Error occuered while spinning up the database anda server.");
     }
}


startServer()
