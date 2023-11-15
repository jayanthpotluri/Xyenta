// import Prodigy from './prod/Prodigy';
import Prodigy from './code/Test';
import Sidebar from './code/Sidebar';
import Icons from './code/Icons';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='flexContent'>
        <Sidebar></Sidebar>
        <Prodigy></Prodigy>
      </div>
      <Icons></Icons>
    </div>
  );
}

export default App;

