import React from 'react';
import * as XLSX from 'xlsx';
import { FaDownload } from "react-icons/fa";

const ExportToExcel = ({ tableRef, fileName }) => {
    
    const tableToJson = () => {
        const headers = [];
        const data = [];
    
        const headerCells = tableRef.current.tHead.rows[0].cells;
        for (let i = 0; i < headerCells.length; i++) {
          headers.push(headerCells[i].textContent.trim());
        }
    
        const rows = tableRef.current.tBodies[0].rows;
        for (let i = 0; i < rows.length; i++) {
          const rowData = {};
          const cells = rows[i].cells;
    
          for (let j = 0; j < cells.length; j++) {
            rowData[headers[j]] = cells[j].textContent.trim();
          }
    
          data.push(rowData);
        }
    
        // Directly pass the array of objects
        if (data.length > 0) {
          console.log(data);
          handleDownload(data);
        }
    };
    
    const handleDownload = (data) => {
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
    
        // Convert your data to a worksheet
        const worksheet = XLSX.utils.json_to_sheet(data);
    
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
        // Generate the Excel file and trigger download
        XLSX.writeFile(workbook, `${fileName}.xlsx`);
    };  

  return (
    <button onClick={tableToJson} className='border text-sx py-2 px-1 flex justify-center items-center mx-4  text-gray-500 rounded-lg'>
              {/* <FontAwesomeIcon icon={faDownload} className='text-gray-500' /> */}
              <FaDownload className='text-gray-500 text-sm  lg:w-4 xl:w-6 md:w-2' />
              <span className='px-1 text-xs lg:text-[10px] xl:text-[14px] md:text-[12px]'>
                تحميل
              </span>
    </button>
  );
};

export default ExportToExcel;
