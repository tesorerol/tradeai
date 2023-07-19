import React from 'react'
import { useParams } from 'react-router-dom'
import data from "../../Data/strategies.json"
import DetailsMarket from './DetailsMarket'
import NotFound from '../../Components/NotFound'

const DetailsDinamic = () => {
    const {id} = useParams()
    const itemMarket =  data.filter(data=> data.id == id)
  return (
    <div>
      {itemMarket == "" ? <NotFound/> : <DetailsMarket scid={itemMarket[0].scid} pair={itemMarket[0].pair} name={itemMarket[0].name} max={itemMarket[0].max} id={itemMarket[0].id} interval={itemMarket[0].interval} maxCount={itemMarket[0].maxCount} weeklyCost={itemMarket[0].weeklyCost} leverage={itemMarket[0].leverage} type={itemMarket[0].type} description={itemMarket[0].description} description2={itemMarket[0].description2} description3={itemMarket[0].description3} period={itemMarket[0].period} typePeriod={itemMarket[0].typePeriod}/>}
    </div>
  )
}

export default DetailsDinamic
