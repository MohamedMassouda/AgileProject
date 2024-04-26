import React from 'react';
import './badge.css';

const Badge = ({ avatarUrl, name, bio }) => {
  return (
    <div className="profile-badge">
      <div className="badge-animation">
        <img src={avatarUrl} alt={`${name}'s avatar`} className="avatar" />
        <div className="profile-info">
          <h3 className="profile-name">{name}</h3>
          <p className="profile-bio">{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default Badge;