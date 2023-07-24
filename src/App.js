import './assets/App.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route,Routes, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import EarnDinamic from './pages/Earns/EarnDinamic';
import Menu from './Components/Menu';
import Header from './Components/Header';
import Login from './pages/Login/Login';
import RecentTransactions from './Components/RecentTransactions';
import { WalletContext } from './Providers/WallectConnect';
import NotFound from './Components/NotFound';
import NewEarn from './pages/NewEarn/NewEarn';
import Genv2 from './pages/NewEarn/gen2v2';
import Home from './pages/Home/Home';
import Market from './pages/Market/Market';
import DetailsDinamic from './pages/Market/DetailsDinamic';
import PopUp from './Components/PopUp';
import Anarkey from './pages/Earns/Anarkey';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPools, fetchWlPools, selectAllPools, selectWlPools } from './reducers/poolSlice';


function App() {
  const [modal,setModal] = useState(false)

  const {isAllowed,setIsAllowed,address} = useContext(WalletContext);
  const [loginActive,setLoginActive] = useState(false)
  const [modalPopUp,setModalPopUp] = useState(true)

  // const dispatch = useDispatch();
  // const allPools = useSelector(selectAllPools)
  // const wlPools = useSelector(selectWlPools)

  // useEffect(()=>{
  //   const url = "http://api.benft.solutions/api/Contract/GetAllContractsData"
  //   dispatch(fetchPools(url))
  // },[])

  // useEffect(()=>{
  //   const urlWl = `http://api.benft.solutions/api/Transaction/GetContractsWallet?wallet=${address}`
  //   if(address){
  //     dispatch(fetchWlPools(urlWl))
  //   }
  // },[address,allPools])

  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 123) {
        e.preventDefault();
    }
}, false);

document.addEventListener("keydown", function(e) {
  if (e.key === "PrintScreen" || e.key === "PrtScn" || e.keyCode === 44) {
      e.preventDefault();
      return false;
  }
});


  useEffect(()=>{
    AOS.init()
  },[])

  function disableScroll() {
    document.body.classList.add("stop-scrolling");
  }
  function enableScroll() {
    document.body.classList.remove("stop-scrolling");
  }
  const toggleModal = ()=>{
    setModal(!modal)
    
    if(window.innerWidth<800 && !modal){
        disableScroll()
    }else if(window.innerWidth<800 && modal){
        enableScroll()
    }
    }

    const [popUp,setPopUp] = useState(false)

    const togglePopup = ()=>{
      setPopUp(!popUp)
    }

    const prueba = true;

  return (
   
      <div className='container-all'>
          {
            !loginActive ? <Login isAllowed={isAllowed} setIsAllowed={setIsAllowed} loginActive={loginActive} setLoginActive={setLoginActive}/> : 
            <>
            {/* <Menu /> */}
            
            <div className='container-right'>
              <Header toggleModal={toggleModal} setLoginActive={setLoginActive}/>
              <div className='container-routes'>
                <Routes>
                  <Route path="/" element={<Navigate to="/earn-strategies"/>} />
                  <Route path="/earn-strategies" element={<Home />} />
                  <Route path="/earn-strategies/wl/:address"  element={isAllowed ? <EarnDinamic /> : <NotFound />} />
                  <Route path="/earn-strategies/:address"  element={<EarnDinamic />} />
                  {/* <Route path="/earn-strategies/:address" render={() => isAllowed ? (<EarnDinamic />) : (null)} /> */}
                  <Route path="/market" element={<Market />} />
                  <Route path="/market/:id" element={<DetailsDinamic />} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
              </div>
            </div>
            {modal && <RecentTransactions toggleModal={toggleModal}/> } 
            {/* {modalPopUp && <PopUp setModalPopUp={setModalPopUp}/>}      */}
            </>
          }
        </div>      
  );
}

export default App;
