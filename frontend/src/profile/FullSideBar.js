// FullSideBar.jsx

import React from 'react';
import './FullSideBar.css';
import profilePic from './elon.jpg';

const FullSideBar = () => {
  const FSideBar = {
    username: "elon Musk",
    email: "elonmusk@gmail.com"
  };

  return (
    <div className='profile'>
      <div className='Sidebar'>
        <img src="" alt="" />
        <div className="agileProject">
          A<span>g</span>ile project
        </div>
      </div>
      <div className='user--profile'>
        <div className='user--detail'>
          <img src={profilePic} alt="profile" />
          <div className='studentNum'>
            <h3 className='username'>{FSideBar.username}</h3>
            <span className='email'>{FSideBar.email}</span>
          </div>
        </div>
        <div className='user-courses'></div>
      </div>
    </div>
  );
};

export default FullSideBar;
