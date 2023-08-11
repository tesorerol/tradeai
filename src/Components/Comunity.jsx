import React from 'react'
import { FaYoutube, FaTwitter, FaLinkedin, FaMediumM, FaDiscord  } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

const Comunity = () => {
  return (
    <div className='comunity'>
           
            <ul className='comunity-grid'>
                <li><a href="https://discord.com/invite/benft?utm_medium=social&utm_source=linktree&utm_campaign=join+the+benft+discord%21" target="_blank"><FaDiscord size={"20px"}/> </a></li>
                <li><a href="https://www.youtube.com/@benft.solutions" target="_blank"><FaYoutube size={"20px"}/></a></li>
                <li><a href="https://www.instagram.com/benft.solutions/" target="_blank"> <AiFillInstagram  size={"20px"}/></a></li>
                <li><a href="https://www.linkedin.com/company/benft/" target="_blank"> <FaLinkedin  size={"20px"} /></a></li>
                <li><a href="https://twitter.com/benft_solutions" target="_blank"> <FaTwitter size={"20px"}  /></a></li>
                <li><a href="https://medium.com/@benft.solutions" target="_blank"> <FaMediumM  size={"20px"} /></a></li>
            </ul>
    </div>
  )
}

export default Comunity
