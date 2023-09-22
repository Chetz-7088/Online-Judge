import './App.css';
import { useState } from 'react';
import axios from 'axios';
import {Button,CircularProgress,TextField, Typography} from "@mui/material"
import Navbar from './components/Navbar/Navbar';
import Files from './components/Files/Files';

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loader,setLoader]=useState(false);
  const [extension,setExtension]=useState("cpp");
  const [name,setName]=useState("undefined");

  const setFile=(file)=>{
      setExtension(file.extension);
      setCode(file.code);
      setName(file.name);
  }
  const handleSubmit = async () => {
    const payload = {
      extension,
      code
    }

    try {
      setLoader(true);
      const { data } = await axios.post('http://localhost:5000/run', payload);
      setLoader(false);
      console.log(data);
      data.output?   setOutput(data.output) : setOutput(data.error.stderr);

   
    } catch (error) {
       console.log({error})
    }
  }
  return (
    <>  
     <Navbar />
      <div className='ide'>
        <Files setFile={setFile} />
        <div className='editor'>
          <div className='editor_menu'> 

            <select  defaultValue={extension} className='select-box' onChange={e=>{setExtension(e.target.value)}}   >
              <option value='cpp' selected >C++</option>
              <option value='c'>C</option>
              <option value='java'>Java</option>
              <option value='py'>Python</option>
              <option value='js'>JavaScript</option>
            </select>
            <Button variant='outlined' size='small'   onClick={handleSubmit}>RUN</Button>
          </div>
          <TextField 
            multiline
            variant='standard'
            rows={26}
            sx={{border:"0px solid black"}}
            className='textarea'
            sx={{margin:"20px"}}
            InputProps={{
              disableUnderline: true,
            }}
            placeholder='Write your code here'
            value={code}
            onChange={(e) => { setCode(e.target.value); }}
          ></TextField>
        </div>
        <div className='outputBox'>
          <Typography sx={{margin:"20px"}} >{
            output ? output : "//Your results will be shown here"
          } <br></br> {loader && <CircularProgress /> }</Typography>
        </div>
      </div>
    </>
  );
}

export default App;
