import React from "react";

function InputControl(props) {
  return (
    <div className="">
      <div className="material-textfield">
        <input
          type={props.type}
          name={props.name}
          onChange={props.handleEvent}
          className="text-sm"
          placeholder={props.label}
          value={props.value}
        ></input>
        <label>{props.label}</label>
      </div>
    </div >
  );
}

export default InputControl;
