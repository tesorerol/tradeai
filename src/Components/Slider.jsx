import React, { useEffect, useRef } from 'react'
import {AiOutlineArrowUp,AiOutlineArrowDown} from "react-icons/ai"
import slider1 from "../assets/slider/what-benft.jpg"
import slider2 from "../assets/slider/web-defi.jpg"
import slider3 from "../assets/slider/ai-earn-engine.jpg"

const Slider = () => {

    let activeSlideIndex = 0
    const slideRight = useRef()
    const slideLeft = useRef()
    const sliderContainer = useRef()
    
    useEffect(()=>{
        slideRight.current.style.top = `-${(3 - 1) * sliderContainer.current.clientHeight}px`
    },[])

    const slider = (direction) => {
        const slidesLength = slideRight.current.childElementCount
        const sliderHeight = sliderContainer.current.clientHeight
        
        if(direction === 'up') {
            activeSlideIndex++
            if(activeSlideIndex > slidesLength - 1) {
                activeSlideIndex = 0
            }
        } else if(direction === 'down') {
            activeSlideIndex--
            if(activeSlideIndex < 0) {
                activeSlideIndex = slidesLength -1
            }
        }
    
        slideRight.current.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`
        slideLeft.current.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    }

  return (
    <div ref={sliderContainer} className="slider-container" data-aos="fade-right" data-aos-duration="1000" >
        <div ref={slideLeft} className="left-slide">
            <div >
            <h2>What is BeNFT</h2>
            <p>BeNFT is a platform that integrates an Artificial Intelligence-based Learn &amp; Earn Engine along with blockchain technology to provide personalized e-learning experiences, TradeAI, and DeFi functionalities. The platform offers access to educational resources and tools in various fields, with AI-generated tutors and instructors. TradeAI generates revenue for the ecosystem and supports the financially sustainable Learn &amp; Earn platform. In addition BeNFT's DeFi functions include course enrollment, public $BeAI Pool access, exclusive NFT collections, and a non-profit organization that supports community causes as well as evolutionary NFTs to track learning progress.
            </p>
            </div>
            <div >
            <h2>AI Learn Engine</h2>
            <p>BeNFT's AI-based E-learning metaverse is a revolutionary platform that integrates education and blockchain technology, with personalized AI learning experience as one of its key advantages. The platform offers access to an extensive array of educational resources and tools in various fields. AI-generated tutors and university instructors allow users to engage with the platform and evolutory NFTs track your progress ensuring that every user can learn at their own pace while receiving the necessary support and guidance to succeed and be motivated during the journey with rewards in $BeAI.</p>
            </div>
            <div >
            <h2>AI Earn Engine</h2>
            <p>BeNFT has developed an AI scalping bot that plays a crucial role in generating revenue to fund their ecosystem, and also helps make their Learn &amp; Earn platform financially sustainable. The bot is designed to identify market openings, closings, and high volatility periods based on news and events.The trading is executed by two validators and one bot, which follows a set of rules based on their AI's training and $BeAI gated pools make this accessible to holders. Excess revenue gets distributed to two wallets - marketing and LP, ensuring that the ecosystem is not only profitable but also sustainable.</p>
            </div>

        </div>
        <div ref={slideRight} className="right-slide">
            <div className='right-slide-div'>
                <img src={slider3} alt="" />
            </div>
            <div className='right-slide-div'>
                <img src={slider2} alt="" />
            </div>
            <div className='right-slide-div'>
                <img src={slider1} alt="" />
            </div>

        </div>
        <div className=" action-buttons">
            <button onClick={()=> slider("up")}  className=" button-slider down-button ">
                <AiOutlineArrowDown size={"18px"} color='#2c98d4'/>
            </button>
            <button onClick={()=> slider("down")} className=" button-slider up-button ">
                <AiOutlineArrowUp size={"18px"} color='#2c98d4'/>
            </button>
        </div>
    </div>

  )
}

export default Slider
