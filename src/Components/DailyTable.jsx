const DailyTable = () => {

    const tableData = [
        {
            id:1,
            day:"7/7",
            performance: "Current",
        },
    ]

return (
<div className='daily-table'>
        <h2>Daily Performance</h2>
        <table>
            <tbody>
            {tableData.map((item,id)=>(
            <tr key={id}>
                <td>{item.day}</td>
                <td>{item.performance}</td>
            </tr>
            ))}
            </tbody>
        </table>
    </div>
)
}

export default DailyTable
