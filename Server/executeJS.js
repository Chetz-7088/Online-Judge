const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { stdout } = require('process');

const outputPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeJS = (filepath) => {
    // const jobId = path.basename(filepath).split(".")[0];
    // const outPath = path.join(outputPath)
    return new Promise((resolve, reject) => {
        exec(
            `node ${filepath}`,
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
    executeJS,
}