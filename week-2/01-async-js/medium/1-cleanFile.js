const fs = require("fs");
const path = require("path");
const readline = require("readline")


const str =  "        hello     this       is        hexica      ";






rl =readline.createInterface({
    input : fs.createReadStream(path.join(__dirname , "1-file-cleaner.md")),
    output : fs.createWriteStream(path.join(__dirname , "1-file-cleaner2.md")),
})

rl.on("line" , (data)=> {
    console.log(data.trim().replace(/\s+/g, " "));
    data = data.trim().replace(/\s+/g, " ");
    data = data + "\n"
    fs.writeFileSync(path.join(__dirname , "1-file-cleaner2.md"),data,{
        flag : "a"
    })
})