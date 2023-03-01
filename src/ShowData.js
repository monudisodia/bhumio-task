import { useState } from "react";
import "./ShowData.css"

export const ShowData = ({ excelData, state }) => {
  const [currState, setCurrState] = useState(state);
  const mapData = ["FirstName", "LastName", "Email", "Phone"];

  const handleStateChange = (e) => {
    setCurrState(e.target.value);
  };
  return (
    <div className="show_data_container">
      <select onChange={handleStateChange}>
        {mapData.map((item) => (
          <option selected={item === currState}>{item}</option>
        ))}
      </select>
      {excelData.map((ele) => (
        <div className="table_data">{ele[currState]}</div>
      ))}
    </div>
  );
};
