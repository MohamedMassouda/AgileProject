import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="video-logo">
      <img
          src="https://horizontech.tn/static/media/logo.3e37e3f2.png"
          alt="Avatar"
          className="rounded-circle shadow-4"
          style={{ width: "50px" }}
        />
      </div>
      <div>
        <img
          src="https://qph.cf2.quoracdn.net/main-qimg-e981687f230a245c7e38c00112d3851a"
          alt="Avatar"
          className="rounded-circle shadow-4"
          style={{ width: "100px" ,}}
        />
                                 
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/langfr-1920px-Flag_of_Tunisia.svg.png"
          alt="Avatar"
          className="rounded-circle shadow-4"
          style={{ width: "75px" ,marginLeft: "10px"}}
        />
        </div>
      <div className="avatar-container">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
          alt="Avatar"
          className="rounded-circle shadow-4"
          style={{ width: "50px" }}
        />
        <div className="avatar-info">
          <h5 className="mb-2">
            <strong>LOCO Monarch</strong>
          </h5>
          <p className="text-muted">
            Web designer <span className="badge bg-primary">PRO</span>
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;