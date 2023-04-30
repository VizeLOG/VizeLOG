import React, { useState, useEffect } from 'react';
import data from './data.json';

const Table = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data.data.sort((a, b) => b.age - a.age));
  }, []);

  return (
    <div style={{ position: 'relative', left: '30px', top: '0px' }}>
      <table style={{backgroundColor: '#ffffff50', textAlign: 'center', fontSize: '20px' , borderRadius: '10px 10px 10px 10px'}}>
        <thead>
          <tr>
            <th style={{backgroundColor: 'lightgray', borderRadius: '10px 0px 0 10px'}}> Number</th>
            <th style={{backgroundColor: 'lightgray', borderRadius: '0px 0px 0 0'}}> Comment </th>
            <th style={{backgroundColor: 'lightgray', borderRadius: '0px 10px 10px 0'}}> Application </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
               <td style={{lineHeight: '35px',}}>  &nbsp; &nbsp;{row.name}</td>
              <td style={{lineHeight: '35px'}}>{row.age}</td>
              <td style={{lineHeight: '35px'}}> {row.city} &nbsp; &nbsp; </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;