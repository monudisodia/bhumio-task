import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { ShowData } from "./ShowData";
import "./Main.css"

function Main() {
  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects


  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  }, [excelFile])



  // handle File
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ];




  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileError("Please select only excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("plz select your file");
    }
  };



  // submit function
  const handleSubmit = (e) => {
    setExcelFile(null);
    setExcelData(null);

  };


  console.log(excelData);

  return (
    <div className="main_container">
      {/* upload file section */}
      <div className="form_container">
        <label class="label">
          <input
            type="file"
            class="custom-file-input"
            onChange={handleFile}
            required
          />
          <span>Import CSV...</span>
        </label>



        {excelFileError && (
          <div className="text-danger">
            {excelFileError}
          </div>
        )}
        <button type="submit" className="submit_btn" onClick={handleSubmit}>Finish</button>
      </div>

      {/* view file section */}
      <div className="data_container">
        {excelData === null ? (
          <>No file selected</>
        ) : (
          <div className="table_container">


            <div className="show_data_container">
              <div className="id_div">
                    
              </div>
              {excelData.map((ele) => (
                <div className="table_data">{ele.id}</div>
              ))}

            </div>

            <ShowData excelData={excelData} state={"FirstName"} />
            <ShowData excelData={excelData} state={"LastName"} />
            <ShowData excelData={excelData} state={"Email"} />
            <ShowData excelData={excelData} state={"Phone"} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
