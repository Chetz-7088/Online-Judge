const express = require('express');
const { generateFile } = require('./generatefile');
const { executeCPP } = require('./executeCPP');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({online: "compiler"});
});

app.post("/run", async(req, res)=>{
    const {language = 'cpp', code} = req.body;
    if(code === undefined){
        return res.status(404).json({success: false, error: "Empty code body!"});
    }
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCPP(filePath);
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ error: error});
    }
});

app.listen(5000, ()=>{
    console.log("Server is listening on port 5000!")
});