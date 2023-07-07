const Table = () => {
    const tableData = [
        {
            id:1,
            coin:"BTCUSDT",
            date:"19/6/2023",
            laverage:"50x - Long",
            size: "$2,518,921.40",
            margin: "$50,493.99",
            roe: "22.65%",
            risk: "38.46%",
            entry:"$26,891.93",
            exit:"$27,016.48",
            pl:" $11,409.77 "
        },
        
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