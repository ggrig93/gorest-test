import React from 'react';
import "./Input.css";

export default function Input(props) {  
  let cls = ["Input"]; 
  if (!props.valid) { 
    cls.push("invalid")
  }  
  return (
    <input className={cls.join(" ")} {...props}/>
  )
}
