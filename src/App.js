import './App.css';
import Body from './components/Body';
import Navbar from './components/Navbar';
import Alert from './components/Alert'
import React,{useState} from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const[mode,setMode]=useState('light');
  const[alert,setAlert]=useState(null);  {/*alert is earlier set as null */}

  const showAlert=(message,type)=>{   {/* will take iinput of message and type of alert*/}
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1400);
  
  }
  const toggleMode=()=>{
    if(mode==='light') 
    {
      setMode('dark');
      document.body.style.backgroundColor='grey';
      showAlert("Dark mode has been enabled!!","success");   {/*passing msg and type to the function */}
      // document.title="TextAnalyzer-Dark Mode";           {/*for changing the doument title according to title */}
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert("Light mode has been enabled!!","success");
      // document.title="TextAnalyzer-Light Mode";        
    }

  }
  return (
    <Router>
      <Routes>
        {/* Your routes here */}
      </Routes>
    </Router>
  );
}

export default App;
