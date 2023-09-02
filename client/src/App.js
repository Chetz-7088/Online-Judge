import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  //console.log(code);

  const handleSubmit = async()=> {
    const payload = {
      language: 'cpp',
      code
    }

    try {
      const { data } = await axios.post('http://localhost:5000/run', payload);
      console.log(data);
      setOutput(data.output);
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className='container'>
        <h1>Online Code Compiler</h1>
        <select className='select-box'>
          <option value='cpp'>C++</option>
          <option value='c'>C</option>
          <option value='java'>Java</option>
          <option value='py'>Python</option>
          <option value='js'>JavaScript</option>
        </select>
        <textarea rows='20' cols='75' className='textarea'
        value={code}
        onChange={(e)=>{ setCode(e.target.value); }}
        ></textarea>
        <br></br>
        <button onClick={handleSubmit}>SUBMIT</button>
        {output &&
          <div className='outputbox'>
            <p>{output}</p>
          </div>}
      </div>
    </>
  );
}

export default App;
