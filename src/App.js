import React from 'react';
import Tooltip from "./Tooltip";
import "./app.css";
const App = () => {
  return (
    <div className="box">
      <Tooltip content={"Left"} position={"left"}>
        <button className="btn">Left</button>
      </Tooltip>
      <Tooltip content={"Top"} position={"top"}>
        <button className="btn">Top</button>
      </Tooltip>
      <Tooltip content={"Bottom"} position={"bottom"}>
        <button className="btn">Bottom</button>
      </Tooltip>
      <Tooltip content={"Right"} position={"right"}>
        <button className="btn">Right</button>
      </Tooltip>
    </div>
  );
};

export default App;
