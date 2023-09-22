const express = require('express');
const { generateFile } = require('./generatefile');
const { executeCPP } = require('./executeCPP');
const cors = require('cors');
const { executeC } = require('./executeC');
const { executeJS } = require('./executeJS');
const { executePY } = require('./executePY');
const { executeJAVA } = require('./executeJAVA');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({online: "compiler"});
});

app.post("/run", async(req, res)=>{
    const {language , code} = req.body;
    //console.log(language);
    if(code === undefined){
        return res.status(404).json({success: false, error: "Empty code body!"});
    }
    switch(language){
        case'c':
            try {
                const filePath = await generateFile(language, code);
                const output = await executeC(filePath);
                res.json({ filePath, output });
            } catch (error) {
                res.status(500).json({ error: error});
            }
            break;

        case'cpp':
            try {
                const filePath = await generateFile(language, code);
                const output = await executeCPP(filePath);
                res.json({ filePath, output });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;

        case'py':
            try {
                const filePath = await generateFile(language, code);
                const output = await executePY(filePath);
                res.json({ filePath, output });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;

            
        case'js':
            try {
                const filePath = await generateFile(language, code);
                const output = await executeJS(filePath);
                res.json({ filePath, output });
            } catch (error) {
                res.status(500).json({ error: error });
            }
            break;

        // case'java':
        //     try{
        //         const filePath = await generateFile(language, code);
        //         const output = await executeJAVA(filePath);
        //         res.json({ filePath, output });
        //     } catch (error) {
        //         res.status(500).json({ error: error });
        //     }
        //     break;

        default:
            console.log('break');
            break;
    }
});

app.listen(5000, ()=>{
    console.log("Server is listening on port 5000!")
});