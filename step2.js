const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile('one.txt', 'utf8', (err, data) => {
        if (err){
            console.log("ERROR!:", err);
            process.exit(1);
        }
        console.log("DATA:", data);
    })
}

async function webCat(URL) {
    try {
        let res = await axios.get(URL)
        console.log(res.data)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

const urlPath = process.argv[2];

if (urlPath.startsWith('https://') || urlPath.startsWith('https://')) {
    webCat(urlPath)
} else {
    cat(urlPath)
}