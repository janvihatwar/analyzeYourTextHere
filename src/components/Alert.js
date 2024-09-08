import React from 'react'

const Alert = (props) => {
  const capitlize=(word)=>{
    const lower=word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }
  return (
    <div style={{height:"50px"}}>
      { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">   {/* if props.alert is not null then it will further persue*/ }
      <strong>{capitlize(props.alert.type)}</strong>: {props.alert.msg}  {/*strong for bold */}
      </div>
    }
    </div>
  
  )
}

export default Alert
