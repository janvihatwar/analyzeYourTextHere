import React from 'react'

const Navbar = (props) => {
    // const[setStyle,setMyStyle] = useState({
    //   color:'black',
    //   backgroundColor:'white'
    // })

    // const[btnText,setBtnText]=useState("Enable Dark Mode") 
    
    // const toggleStyle=()=>{
    //   if(setStyle.color==='white')
    //   {
    //     setMyStyle({
    //       color:'white',
    //       backgroundColor:'black'
    //     })
    //     setBtnText("Enable Light Mode");
    //   }
    //   else{
    //     setMyStyle({
    //       colour:'black',
    //       backgroundColor:'white'
    //     })
    //     setBtnText("Enable Dark Mode");
    //   }
    // }

  return (
    <>
     <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
    <div className="container-fluid">
      <a className="navbar-brand" href="/">{props.title}</a> {/* props.title will point to the text which we are given in the app.js in title */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
           <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
          {/* <a className="nav-link" href="/">About</a>  */}
          </li>
          {/* <li className="nav-item">
          <a className="nav-link" href="/">Skills</a> 
          </li>
          <li className="nav-item">
          <a className="nav-link" href="/">Project</a> 
          </li> */}
          <li className="nav-item">
          {/* <a className="nav-link" href="/">Contact</a>  */}
          </li>
          <li className="nav-item dropdown">
        {/* <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a> */}
            {/* <ul className="dropdown-menu">
             <li><a className="dropdown-item" href="/">Action</a></li>
              <li><a className="dropdown-item" href="/">Another action</a></li>
              <li><a className="dropdown-divider"> Another action</a></li>
              <li><a className="dropdown-item" href="/">Something else here</a></li> 
            </ul> */}
          </li>
          
        </ul>
        
        <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
          <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
          <label className="form-check-label"  htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
        </div>
      </div>
    </div>
  </nav>
    
    </>
  )
}

// Navbar.defaultProps={
//   title:'Enter title here',
// };
export default Navbar
