import React from 'react';
import './css/Icons.css';

const Icons = () =>{

    return(
        <div className='content'>
            <center>
                <div className='iconsContent'>
                    <button className='icon1'>
                        <svg aria-hidden="true" fill="currentColor" width="40" height="40" viewBox="0 0 24 24" style={{minWidth: '40px'}}>
                            <path d="M9 16.172l10.594-10.594 1.406 1.406-12 12-5.578-5.578 1.406-1.406z"></path>
                        </svg>
                    </button>
                    <button className='icon2'>
                        <svg aria-hidden="true" fill="currentColor" width="40" height="40" viewBox="0 0 24 24" style={{minWidth: '40px'}}>
                            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
                        </svg>
                    </button>
                    <button className='icon3'>
                        <svg aria-hidden="true" fill="currentColor" width="40" height="40" viewBox="0 0 24 24" style={{minWidth: '40px'}}>
                            <path d="M12 20.016c4.406 0 8.016-3.609 8.016-8.016 0-1.828-0.609-3.563-1.688-4.922l-11.25 11.25c1.359 1.078 3.094 1.688 4.922 1.688zM3.984 12c0 1.828 0.609 3.563 1.688 4.922l11.25-11.25c-1.359-1.078-3.094-1.688-4.922-1.688-4.406 0-8.016 3.609-8.016 8.016zM12 2.016c5.531 0 9.984 4.453 9.984 9.984s-4.453 9.984-9.984 9.984-9.984-4.453-9.984-9.984 4.453-9.984 9.984-9.984z"></path>
                        </svg>
                    </button>
                    <button className='icon4'>
                        <svg aria-hidden="true" fill="currentColor" width="40" height="40" viewBox="0 0 24 24" style={{minWidth: '40px'}}>
                            <path d="M11.016 9l1.406 1.406-3.609 3.609h9.188v-10.031h2.016v12h-11.203l3.609 3.609-1.406 1.406-6-6z"></path>
                        </svg>
                    </button>
                </div>
            </center>
        </div>
    );
};
export default Icons;