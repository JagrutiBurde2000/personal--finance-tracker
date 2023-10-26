import React from "react";
import "./styles.css"
function Input({lable, state,placeholder, setState,type}){
return <div className="input-wrapper">
  <p className="lable-input">{lable}</p>
  <input value={state}
  type={type}
  placeholder={placeholder} 
  onChange={(e)=>setState(e.target.value)}
  className="custom-input"/>
</div>
}

export default Input;