import React from 'react'
import { useParams } from 'react-router-dom'
import data from "../../Data/strategies.json"
import DetailsMarket from './DetailsMarket'
import NotFound from '../../Components/NotFound'

const DetailsDinamic = () => {
    const {id} = useParams()
    const itemMarket =  data.filter(data=> data.id == id)
    console.log(itemMarket)
  return (
    <div>
      {itemMarket == "" ? <NotFound/> : <DetailsMarket pair={itemMarket[0].pair} max={itemMarket[0].max} id={itemMarket[0].id} interval={itemMarket[0].interval} maxCount={itemMarket[0].maxCount} weeklyCost={itemMarket[0].weeklyCost} leverage={itemMarket[0].leverage} type={itemMarket[0].type}/>}
    </div>
  )
}

export default DetailsDinamic
