const fs = require('fs');
const axios = require('axios');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

function cat(path, outputPath) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:\n ${err}`);
            process.exit(1);
        }
        if (outputPath) {
            writeToFile(outputPath, data);
        } else {
            console.log(data);
        }
    });
}

async function webCat(url, outputPath) {
    try {
        let resp = await axios.get(url);
        if (outputPath) {
            writeToFile(outputPath, resp.data);
        } else {
            console.log(resp.data);
        }
    } catch (err) {
        console.error(`Error fetching ${url}:\n ${err}`);
        process.exit(1);
    }
}

async function writeToFile(path, data) {
    try {
        await writeFile(path, data);
    } catch (err) {
        console.error(`Couldn't write ${path}:\n ${err}`);
        process.exit(1);
    }
}

let pathOrUrl, outputPath;
if (process.argv[2] === '--out') {
    outputPath = process.argv[3];
    pathOrUrl = process.argv[4];
} else {
    pathOrUrl = process.argv[2];
}

if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    webCat(pathOrUrl, outputPath);
} else {
    cat(pathOrUrl, outputPath);
}