import React from "react";
import "../css/PopUp.css";

function PopUp({trigger, setTrigger, children}) {
  return (trigger) ? (
    <div className="popup-box">
      <div className="popup-box-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>X</button>
        <div className="popup-content">
            {children}
        </div>
      </div>
    </div>
  ) : "";
}

export default PopUp;