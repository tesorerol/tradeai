import "antd/dist/antd.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./assets/App.scss";
import Header from "./Components/Header";
import NotFound from "./Components/NotFound";
import RecentTransactions from "./Components/RecentTransactions";
import EarnDinamic from "./pages/Earns/EarnDinamic";
import YieldBox from "./pages/YieldBox";
import Login from "./pages/Login/Login";
import { WalletContext } from "./Providers/WallectConnect";

function App() {
  const [modal, setModal] = useState(false);

  const { isAllowed, setIsAllowed } = useContext(WalletContext);

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.keyCode === 123) {
        e.preventDefault();
      }
    },
    false
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "PrintScreen" || e.key === "PrtScn" || e.keyCode === 44) {
      e.preventDefault();
      return false;
    }
  });

  useEffect(() => {
    AOS.init();
  }, []);

  function disableScroll() {
    document.body.classList.add("stop-scrolling");
  }
  function enableScroll() {
    document.body.classList.remove("stop-scrolling");
  }
  const toggleModal = () => {
    setModal(!modal);

    if (window.innerWidth < 800 && !modal) {
      disableScroll();
    } else if (window.innerWidth < 800 && modal) {
      enableScroll();
    }
  };

  return (
    <div className="container-all">
      {!isAllowed ? (
        <Login isAllowed={isAllowed} setIsAllowed={setIsAllowed} />
      ) : (
        <>
          {/* <Menu /> */}

          <div className="container-right">
            <Header toggleModal={toggleModal} />
            <div className="container-routes">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Navigate to="/earn-strategies/0x95E257Ba297E705B968c605BbDb5937a0CF95334" />
                  }
                />
                <Route
                  path="/earn-strategies/:address"
                  element={<EarnDinamic />}
                />
                <Route exact path="/stake" element={<YieldBox />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
          {modal && <RecentTransactions toggleModal={toggleModal} />}
        </>
      )}
    </div>
  );
}

export default App;
