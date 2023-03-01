import { useState } from "react";
import "./ShowData.css"

export const ShowData = ({ csvData, state }) => {
  const [currState, setCurrState] = useState(state);
  const mapData = ["FirstName", "LastName", "Email", "Phone"];

  const handleStateChange = (e) => {
    setCurrState(e.target.value);
  };
  return (
    <div className="show_data_container">
 
       {/* this is select part for heading */}

      <select onChange={handleStateChange}>
        {mapData.map((item) => (
          <option selected={item === currState}>{item}</option>
        ))}
      </select>

      {/* this is data part of the table */}
      {csvData.map((ele) => (
        <div className="table_data">{ele[currState]}</div>
      ))}
    </div>
  );
};
