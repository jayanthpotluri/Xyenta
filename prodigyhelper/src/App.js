import Prodigy from './prod/Prodigy';
import Icons from './prod/Icons';
import Sidebar from './code/Sidebar';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {



  return (
    <div className="App">
      <div className='flexContent'>
        <Sidebar></Sidebar>
        <Prodigy /> 
        
        {/* <Icons /> */}
      </div>
      {/* <Icons></Icons> */}
    </div>
  );
}

export default App;

