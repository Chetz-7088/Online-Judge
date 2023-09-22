const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePY = (filepath) => {
    return new Promise((resolve, reject) => {
        exec(
            `python ${filepath}`,
            (error, stdout, stderr) => {
                if(error){
                    reject({error, stderr});
                }
                if(stderr){
                    reject(stderr);
                }
                resolve(stdout);
            }
        );
    });
};

module.exports = {
    executePY,
}