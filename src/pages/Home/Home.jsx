import React from 'react'
import Slider from '../../Components/Slider'
import {FiUsers} from "react-icons/fi"
import {BsGraphUp} from "react-icons/bs"
import {MdOutlineHandshake} from "react-icons/md"
import exploreIa from "../../assets/cards/home-ia.png"
import social from "../../assets/cards/home-social.png"
import whitepaper from "../../assets/cards/home-whitepaper.png"

const Home = () => {
  return (
    <div className='container-route'>
        
      <Slider />
      <div className='container-cards'
      data-aos="fade-up"
      data-aos-duration="1000"
      >
        <a href="https://www.benft.solutions/" target='_blank'>
          <div className='home-explore card-home' >
            <img src={exploreIa} alt="" />
              {/* <div className='container-cards-item-icon'>
                  
              </div>
              <h2>Learn AI</h2> */}
          </div>
        </a>
        <a href="https://whitepaperv2.benft.solutions/" target='_blank'>
          <div className=' home-whitepaper card-home'>
            <img src={whitepaper} alt="" />
          </div>
        </a>
        <a href="https://linktr.ee/benftai" target='_blank'>
          <div className=' home-socials card-home'>
            <img src={social} alt="" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default Home
