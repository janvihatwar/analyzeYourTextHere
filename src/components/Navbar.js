import React from 'react';

const Navbar = (props) => {
  return (
    <>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          {/* Dynamic Title */}
          <a className="navbar-brand" >
            {props.title}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* Replace "#" with a valid route */}
                <a className="nav-link active" aria-current="page" >
                  Home
                </a>
              </li>
              {/* Example of disabled and commented-out sections */}
              {/* Uncomment and use valid hrefs when ready */}
              {/* <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li> */}
            </ul>

            {/* Dark/Light Mode Toggle */}
            <div className={`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'light'}`}>
              <input
                className="form-check-input"
                onClick={props.toggleMode}
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                Change Mode
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// Default props for fallback values
Navbar.defaultProps = {
  title: 'Enter title here',
};

export default Navbar;
