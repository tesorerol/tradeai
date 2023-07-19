import React from 'react'

const TablePeriod = ({tittle,period,typePeriod,data}) => {
    
    console.log(data[0])

    const renderWeekRows = () => {
      const rows = [];
      for (let i = 0; i < period; i++) {
        rows.push(
          <tr key={`week-${i+1}`}>
            <td>{typePeriod} {i+1}</td>
            <td>{data[i] != undefined && data[i].toString()}</td>
          </tr>
        );
      }
      return rows;
    };
  
    return (
      <div className='container-body-table'>
        <h3>{tittle}</h3>
        <table className='body-table'>
          <tbody>{renderWeekRows()}</tbody>
        </table>
      </div>
    );
  };

export default TablePeriod
