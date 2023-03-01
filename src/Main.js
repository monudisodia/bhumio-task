import { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { ShowData } from "./ShowData";
import "./Main.css"

function Main() {
  // on change states
  const [inputFile, setInputFile] = useState(null);
  const [inputFileError, setInputFileError] = useState(null);

  const [csvData, setCsvData] = useState(null);
  // it will contain array of objects

  const inputRef = useRef();


  useEffect(() => {
    if (inputFile !== null) {
      const csvFile = XLSX.read(inputFile, { type: "buffer" });
      const worksheetName = csvFile.SheetNames[0];
      const worksheet = csvFile.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setCsvData(data);
    }
  }, [inputFile])



  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];




  const inputFileHandle = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let readingFile = new FileReader();
        readingFile.readAsArrayBuffer(selectedFile);
        readingFile.onload = (e) => {
          setInputFileError(null);
          setInputFile(e.target.result);
        };
      } else {
        setInputFileError("Please select only excel file types");
        setInputFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };



  // Finish function
  const finishHandle = (e) => {
    setInputFile(null);
    setCsvData(null);
    inputRef.current.value = null;
  };


  console.log(csvData);

  return (
    <div className="main_container">
      {/* upload input file section */}
      <div className="form_container">
        <label class="label">
          <input
            type="file"
            class="custom-file-input"
            onChange={inputFileHandle}
            ref={inputRef}
            required
          />
          <span>Import CSV...</span>
        </label>


        {/* finish button section */}
        {inputFileError && (
          <div className="text-danger">
            {inputFileError}
          </div>
        )}
        <button className="submit_btn" onClick={finishHandle}>Finish</button>
      </div>



      {/* data file section for table view */}
      <div className="data_container">
        {csvData === null ? (
          <>No file selected</>
        ) : (
          <div className="table_container">


            <div className="show_data_container">
              <div className="id_div">

              </div>
              {csvData.map((ele) => (
                <div className="table_data">{ele.id}</div>
              ))}

            </div>

            <ShowData csvData={csvData} state={"FirstName"} />
            <ShowData csvData={csvData} state={"LastName"} />
            <ShowData csvData={csvData} state={"Email"} />
            <ShowData csvData={csvData} state={"Phone"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
