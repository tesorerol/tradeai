const Table = () => {
    const tableData = [
        
        
    ]


  return (
    <div className='container-table'
    >
            <table>
                <thead>
                <tr>
                    <th>PAIR</th>
                    <th>DATE</th>
                    <th>LEVERAGE</th>
                    <th>SIZE</th>
                    <th>MARGIN</th>
                    <th>ROE</th>
                    <th>RISK</th>
                    <th>ENTRY PRICE</th>
                    <th>EXIT PRICE</th>
                    <th>P/L</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((item,id)=>(
                    <tr key={id}>
                    <td>{item.coin}</td>
                    <td>{item.date}</td>
                    <td className={item.laverage.includes("Long") ? "color-green" : "color-red"}>{item.laverage}</td>
                    <td>{item.size}</td>
                    <td>{item.margin}</td>
                    <td>{item.roe}</td>
                    <td>{item.risk}</td>
                    <td>{item.entry}</td>
                    <td>{item.exit}</td>
                    <td className={item.pl.includes("-") ? "color-red" : "color-green"}>{item.pl}</td>
                </tr>
                ))}
                </tbody>
            </table>
        </div>
  )
}

export default Table