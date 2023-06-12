import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { WalletContext } from "../Providers/WallectConnect";

const MenuNav2 = ({ removeAct, addAct, refActive }) => {
  const { iswhiteList } = useContext(WalletContext);

  const [isOpen, setIsOpen] = useState({
    earn: false,
    weekly: false,
    monthly: false,
    private: false,
    vispx: false,
    claim: false,
  });

  const toggleEarn = (id) => {
    const nEarn = { ...isOpen };
    if (id == "earn") {
      nEarn.earn = !nEarn.earn;
      nEarn.weekly = false;
      nEarn.monthly = false;
      nEarn.private = false;
      nEarn.vispx = false;
      nEarn.claim = false;
      setIsOpen(nEarn);
    } else if (id == "weekly") {
      nEarn.weekly = !nEarn.weekly;
      nEarn.monthly = false;
      nEarn.private = false;
      nEarn.vispx = false;
      nEarn.claim = false;
      setIsOpen(nEarn);
    } else if (id == "monthly") {
      nEarn.monthly = !nEarn.monthly;
      nEarn.weekly = false;
      nEarn.private = false;
      nEarn.vispx = false;
      nEarn.claim = false;
      setIsOpen(nEarn);
    } else if (id == "private") {
      nEarn.private = !nEarn.private;
      nEarn.weekly = false;
      nEarn.monthly = false;
      nEarn.vispx = false;
      nEarn.claim = false;
      setIsOpen(nEarn);
    } else if (id == "vispx") {
      nEarn.vispx = !nEarn.vispx;
      nEarn.weekly = false;
      nEarn.monthly = false;
      nEarn.private = false;
      nEarn.claim = false;
      setIsOpen(nEarn);
    } else if (id == "claim") {
      nEarn.claim = !nEarn.claim;
      nEarn.weekly = false;
      nEarn.monthly = false;
      nEarn.private = false;
      nEarn.vispx = false;
      setIsOpen(nEarn);
    }
  };

  return (
    <div className="menu-nav">
      {/* <NavLink className='button-nav' to="/earn-strategies/0x4E8d2157cE9A79319AF4bcAF336F5ab4A8C51912" onClick={removeAct}> Earn TradeAi Pass</NavLink> */}
      <NavLink className="button-nav" to="/stake" onClick={removeAct}>
        {" "}
        Stake
      </NavLink>
      {iswhiteList ? (
        <NavLink
          className="button-nav"
          to="/earn-strategies/0x95E257Ba297E705B968c605BbDb5937a0CF95334"
          onClick={removeAct}
        >
          {" "}
          Anarkey
        </NavLink>
      ) : (
        <a className="button-nav" href={undefined}>
          Anarkey
        </a>
      )}
      {/* <NavLink className='button-nav' to="/earn-strategies/0x818F3eE1E66773165f1B4e1b815c57a275E6e807" onClick={removeAct}> Public</NavLink> */}
      {/* <div>
                <p ref={refActive} onClick={()=>toggleEarn("earn")} data-aos="fade-right" data-aos-delay="300" className='earn-p menu-nav-options'>
                    <span className="ms-1 d-sm-inline"><FaMoneyBillWaveAlt className='me-1' size={"20px"} color="#9ed0ed"/> Earn Strategies <IoIosArrowDown className={`${!isOpen.earn ? "arrow-close" : "arrow-open"}`}/></span>
                </p>
                {
                    isOpen.earn &&
                    <ul className='menu-list-2 pruebita'>
                        <li className='menu-list-2-item'>
                            <div onClick={()=>toggleEarn("claim")} className='menu-list-2-nav'>
                                <p>Claim Only</p>
                                <IoIosArrowDown className={`icon-arrow-down ${!isOpen.claim ? "arrow-close" : "arrow-open"}`} />
                            </div>        

                            {
                                isOpen.claim &&
                                <ul className="menu-list-options">
                                                {data.map((contract,i)=>(
                                                    contract.parent == "claim" && contract.visible == "true" && 
                                                    <div key={i} className='list-options'>
                                                        <NavLink onClick={addAct} to={`/earn-strategies/${contract.address}`} className={"w-100 d-flex gap-2"}>
                                                            <BsArrowRightShort size={"18px"}/>
                                                            <li className='w-100 menu-list-2-nav-option'>
                                                                {contract.namePool}
                                                            </li>
                                                        </NavLink>
                                                    </div>
                                                ))}       
                                </ul>
                            }            
                        </li>
                        <NavLink onClick={addAct} to="/earn-strategies/0x4E8d2157cE9A79319AF4bcAF336F5ab4A8C51912" className={"menu-list-2-item"}>
                            <li className='w-100 menu-list-2-nav'>
                                <p>
                                    Earn BeNFT Pass
                                </p>
                            </li>
                        </NavLink>
                        <NavLink onClick={addAct} to="/earn-strategies/0x92D2BFDAB3587E667B9F46842914a4DE8aA581D8" className={"menu-list-2-item"}>
                            <li className='w-100 menu-list-2-nav'>
                                <p>
                                    Anarkey <span className='tag-new'>NEW</span>
                                </p>
                            </li>
                        </NavLink>
                        <li className='menu-list-2-item'>
                            <div className='menu-list-2-nav' onClick={()=>toggleEarn("weekly")}>
                                <p>Public </p>
                                <IoIosArrowDown className={`icon-arrow-down ${!isOpen.weekly ? "arrow-close" : "arrow-open"}`}/>
                            </div>
                            {
                                isOpen.weekly &&
                                <ul className="menu-list-options" id="" data-bs-parent="">
                                            {data.map((contract,i)=>(
                                                contract.parent == "weekly" && contract.visible == "true" && 
                                                <div key={i} className='list-options'>
                                                    <NavLink onClick={addAct} to={`/earn-strategies/${contract.address}`} className={"w-100 d-flex gap-2"}>
                                                    <BsArrowRightShort size={"18px"}/>
                                                        <li className='w-100 menu-list-2-nav-option'>
                                                            {contract.namePool}
                                                        </li>
                                                    </NavLink>
                                                </div>
                                            ))}
                                </ul>
                            }
                        </li>
                        <li className='menu-list-2-item'>
                            <div className='menu-list-2-nav' onClick={()=>toggleEarn("private")}>
                                <p>Partners </p>
                                <IoIosArrowDown className={`icon-arrow-down ${!isOpen.private ? "arrow-close" : "arrow-open"}`}/>
                            </div>
                            {
                                isOpen.private &&
                                <ul className="menu-list-options">
                                            {data.map((contract,i)=>(
                                                contract.parent == "private" && contract.visible == "true" && 
                                                <div key={i} className='list-options'>
                                                    <NavLink onClick={addAct} to={`/earn-strategies/${contract.address}`} className={"w-100 d-flex gap-2"}>
                                                    <BsArrowRightShort size={"18px"}/>
                                                    <li className='w-100 menu-list-2-nav-option'>
                                                        {contract.namePool}
                                                    </li>
                                                    </NavLink>
                                                </div>
                                            ))}
                                </ul>
                            }
                        </li>
                    </ul>
                }

            </div> */}

      {/* <NavLink onClick={removeAct} className='menu-nav-options' to="/collection" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400"><MdCollections size={"20px"} color="#9ed0ed"/> Collection</NavLink> */}
    </div>
  );
};

export default MenuNav2;
