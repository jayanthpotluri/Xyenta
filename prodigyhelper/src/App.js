import Prodigy from './prod/Prodigy';
import Icons from './prod/Icons';
import Sidebar from './code/Sidebar';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [lines, setLines] = useState([]);
  const [textValue, setTextValue] = useState(0);

  const updateStateValue = (newValue) => {
    setTextValue(textValue + newValue);
  };

  useEffect(() => 
  {
    const fetchData = async () => {
      try 
      {
        // Fetch JSONL file
        const response = await fetch('/prodigy.jsonl');
        if (!response.ok) 
        {
          throw new Error(`Failed to fetch data.jsonl (${response.status} ${response.statusText})`);
        }
        // Read JSONL data as text
        const jsonlData = await response.text();
        const lines = jsonlData.split('\n').map(line => JSON.parse(line));
        // console.log(lines[0].text);
        setLines(lines[textValue].text);
        // Log JSONL data to the console
        // console.log('JSONL Data:', jsonlData);
      } catch (error) {
        console.error('Error fetching JSONL data:', error.message);
      }
    };

    fetchData();
  }, [textValue]);


  return (
    <div className="App">
      <div className='flexContent'>
        <Sidebar></Sidebar>
        <Prodigy lines={lines} /> 
        
        <Icons updateStateValue={updateStateValue} />
      </div>
      {/* <Icons></Icons> */}
    </div>
  );
}

export default App;

