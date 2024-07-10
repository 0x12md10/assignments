const fs = require("fs");
const path = require("path");


fs.writeFileSync(
    path.join(__dirname , "4-write-to-file.md"),
    "This is written by fs module.",
    {
       flag : "a"
    }
)

// console.log()