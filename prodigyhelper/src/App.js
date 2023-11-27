import Prodigy from './prod/Prodigy';
// import Prodigy from './code/Test';
// import ProdigyImage from './code/ProdigyImage';
import Sidebar from './code/Sidebar';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [lines, setLines] = useState([]);
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
        setLines(lines[0].text);
        // Log JSONL data to the console
        // console.log('JSONL Data:', jsonlData);
      } catch (error) {
        console.error('Error fetching JSONL data:', error.message);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="App">
      <div className='flexContent'>
        <Sidebar></Sidebar>
        <Prodigy lines={lines} /> 
      </div>
      {/* <Icons></Icons> */}
    </div>
  );
}

export default App;

