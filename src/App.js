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


function App() {
  const [modal,setModal] = useState(false)

  const {isAllowed,setIsAllowed} = useContext(WalletContext);

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

  return (
   
      <div className='container-all'>
          {
            !isAllowed ? <Login isAllowed={isAllowed} setIsAllowed={setIsAllowed}/> : 
            <>
            <Menu />
            
            <div className='container-right'>
              <Header toggleModal={toggleModal} />
              <div className='container-routes'>
                <Routes>
                  <Route path="/" element={<Navigate to="/earn-strategies/0x95E257Ba297E705B968c605BbDb5937a0CF95334"/>} />
                  <Route path="/earn-strategies/:address" element={<EarnDinamic />} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
              </div>
            </div>
            {modal && <RecentTransactions toggleModal={toggleModal}/> } 
                      
            </>
          }
        </div>      
  );
}

export default App;
