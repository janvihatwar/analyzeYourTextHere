import React, { useState } from 'react'

const Body = (props) => {
  const[text,setText]=useState('');
  const upCase=()=>{
    let newText1=text.toUpperCase();
    setText(newText1);
    props.showAlert("Converted to UpperCase!!","success");
  }
  
  const lwCase=()=>{
    let newText2=text.toLowerCase();
    setText(newText2);
    props.showAlert("Converted to LowerCase!!","success");
  }
  
  const clearText=()=>{
    let newText3=('');
    setText(newText3);
    props.showAlert("Text Cleared!!","success");
  }

  const copyText=()=>{
    var  text=document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();   {/*it will not select bydefaultt text aftre copy */}
    props.showAlert("Text Copied!!","success");
  }

  const extraSpace=()=>{
    let newText4=text.split(/[ ]+/);
    setText(newText4.join(" "))
    props.showAlert("Extra Space removed!!","success");

  }

  
  const change=(event)=>{
    setText(event.target.value);   {/*(event handler)it will add the exist valur with the current value OR text*/}
  }

  return (
  <>

  <div className="container my-4" style={{color:props.mode==='dark'?'white':'black'}}>
      <h2>Text Analyer - Word counter, Character counter, Remove extra spaces</h2>  

      <textarea value={text} onChange={change}   mode={props.mode} 
      style={{backgroundColor:props.mode==='dark'?'rgb(30 65 94)':'white',
      color:props.mode==='dark'?'white':'black',border:"1px solid black"}} 
      rows="8" cols="32" id="myBox"></textarea> {/*onChange is required for user should type new text */ }

      <br></br>
      <button disabled={text.length===0} className="btn btn-primary mx-3" onClick={upCase}>Uppercase</button>
      <button disabled={text.length===0} className="btn btn-primary my-2" onClick={lwCase}>Lowercase</button>
      <button disabled={text.length===0} className="btn btn-primary mx-3" onClick={clearText}>Clear Text</button>
      <button disabled={text.length===0} className="btn btn-primary my-2" onClick={copyText}>Copy Text</button>
      <button disabled={text.length===0} className="btn btn-primary mx-3" onClick={extraSpace}>Remove Extra Space</button>
  </div>

  <div className="container3 my-1" style={{backgroundColor:props.mode==='dark'?'rgb(2 56 98)':'white',color:props.mode==='dark'?'white':'black'}}>
    <h3>Your text summary</h3>
    <p>{text.split(/\s+/).filter((element)=>{return element.length!==0}).length} Words And {text.length} Characters</p>
    <p>{0.008*text.split(" ").filter((element)=>{return element.length!==0}).length} Minutes to Read</p>
    <p>{text.split(".").length-1} Number of Sentance</p>
    <h4>Preview Text</h4>
    <p>{text.length>0?text:"Nothing to preview "}</p>
  </div> 

  </>
  )
}

export default Body
