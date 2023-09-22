import React, { useState } from 'react'
import "./styles.css";
import FilesIcon from "@mui/icons-material/FileOpen"
import { IconButton, Typography, Stack } from '@mui/material';

const Files = ({setFile}) => {
  const [files, setFiles] = useState([
    {
      code: `#include<iostream> using namespace std; int main(){cout<<"hello world";}`,
      extenstion: "cpp",
      name: "intro",
    },
    {
      code: `print("hello world")`,
      extenstion: "py",
      name: "panda",
    }
  ])

  const handleClick=(file)=>{
     setFile(file);
  }
  return (
    <div className='files'>
      <Typography sx={{ borderBottom: "1px solid grey", display: "flex", alignItems: "center", justifyContent: "space-between", margin: "0px 10px" }}> <IconButton><FilesIcon /></IconButton> Files</Typography>
      <Stack sx={{marginTop:"20px"}}>
        {
          files.map(file =>
            <Typography 
            className="file"
            onClick={e=>{e.preventDefault();handleClick(file)}}
            > {`${file.name}.${file.extenstion}`}</Typography>
          )
        }

      </Stack>

    </div>
  )
}

export default Files