import React from 'react';
import './css/Sidebar.css';
import logo from './images/Xyentalogo.png';

const Sidebar = () => {
    return(
        <div className='content'>
            <div className='sidebarContent'>
                <div className='logo'>
                    <img src={logo}></img>
                </div>
                <div>
                    <form className="examples">
                        <label className="examplesLabel">EXAMPLE </label>
                        <select name="examples" style={{marginLeft:'20px', borderRadius:'5px'}}>
                            <option value="option1">Option1</option>
                            <option value="option2">Option2</option>
                            <option value="option3">Option3</option>
                            <option value="option4">Option4</option>
                        </select>
                    </form>
                    <form className="themes">
                        <label className="themesLabel">THEME </label>
                        <select name="themes" style={{marginLeft:'40px', borderRadius:'5px'}}>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;