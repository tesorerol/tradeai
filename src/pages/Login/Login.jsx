import React, { useContext, useEffect } from 'react'
import logo from '../../assets/logo/logo-w-b.png'
import metamaskLogo from '../../assets/icons/metamask.png.png'
import walletConnect from '../../assets/icons/wallet-connect.png'
import trustWallet from '../../assets/icons/trust-w.png'
import marcoContent from "../../assets/login/marco-card.png"
import marcoButton from "../../assets/login/marco-boton.png"
import marcoMobile from "../../assets/login/marco-mobile.png"
import { WalletContext } from '../../Providers/WallectConnect'
import WL from '../../Data/wl.json'
import Swal from 'sweetalert2'


const Login = ({ isAllowed, setIsAllowed , loginActive, setLoginActive}) => {
  const { connectToWallet, WallectConnect, address, disconnectWallet } = useContext(WalletContext)

  useEffect(() => {
    if (address) {
      let wl = WL.filter((wl) => wl.wallet.toLowerCase() === address.toLowerCase())
      if(wl.length>0){
        setIsAllowed(!isAllowed)
        setLoginActive(!loginActive)
      }else{
        setLoginActive(!loginActive)
      }
      // else{
      //   Swal.fire({
      //       title:"Sorry you are not in whitelist",
      //       icon:"error"
      //   })
      //   disconnectWallet();
      // }
    }
  }, [address])

  function WhiteListWallet(type) {
    if (type == 'connect') {
      WallectConnect()
    } else {
      connectToWallet()
    }
    
  }

  return (
    <div className="page-login">
      <div className='container-page-login'>
      <div className="page-login-logo aparecer2">
        <img className='page-login-logo-img' src={logo} alt="Logo BeNFT" />
      </div>
      <div className="page-login-content aparecer2">
        <img className='page-login-content-bg' src={marcoContent} alt="" />
        <img className='page-login-content-bg-mobile'src={marcoMobile} alt="" />
        <div className="modal-wallets">
          <ul>
            <li>
              <button onClick={() => WhiteListWallet('normal')}>
                <img
                  className="icon-wallets metamask"
                  src={metamaskLogo}
                  alt="logo metamask"
                />
                Metamask
              </button>
            </li>
            <li>
              <button onClick={() => WhiteListWallet('normal')}>
                <img
                  className="icon-wallets trust-wallet"
                  src={trustWallet}
                  alt="logo trust wallet"
                />
                Trust Wallet
              </button>
            </li>
            <li>
              <button onClick={() => WhiteListWallet('connect')}>
                <img
                  className="icon-wallets wallet-connect"
                  src={walletConnect}
                  alt="logo wallet connect"
                />{' '}
                Wallet Connect
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className='request-whitelist aparecer2'>
        <img className='request-whitelist-bg' src={marcoButton} alt="TradeAI" />
        <a className='request-whitelist-button' href="https://forms.gle/2pyyBZdhycXtHTrW6" target='_blank' rel="noreferrer">Request to add to Whitelist</a>
      </div>
      </div>
    </div>
  )
}

export default Login
