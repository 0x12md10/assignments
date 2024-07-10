const fs = require("fs");
const path = require("path");

function delay() {
    for(let i = 0; i < 10000000000;i++) {
        

    }
    console.log("delay over")
}

function read() {
    fs.readFile(path.join(__dirname , "3-read-from-file.md") , {encoding : "utf-8"} , (err,data)=> {
        if(err) {
            console.log("Error: " , err);
            return;
        }
        console.log("Data : " , data);
    })
    delay()
}

read()