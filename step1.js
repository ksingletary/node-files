const fs = require('fs');

function cat(path) {
    fs.readFile('one.txt', 'utf8', (err, data) => {
        if (err){
            console.log("ERROR!:", err);
            process.exit(1);
        }
        console.log("DATA:", data);
    })
}

const path = process.argv[2];
cat(path);