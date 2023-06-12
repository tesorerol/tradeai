import QRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import mobile from "is-mobile";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Web3Modal from "web3modal";
import { convertToHex } from "../Helpers";
import { apiService } from "../apis";
import ENV from "../utils/env";
const web3modalStorageKey = "WEB3_CONNECT_CACHED_PROVIDER";

export const WalletContext = createContext({});

const WallectConnectProvider = new WalletConnectProvider({
  rpc: {
    [ENV.chainId]: ENV.chainIdRPC,
  },
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

const WallectConnect = ({ children }) => {
  const [address, setAddress] = useState(undefined);
  const [iswhiteList, setWhiteList] = useState("");
  const [currentChainId, setCurrentChainId] = useState(Number(ENV.chainId));
  const [isAllowed, setIsAllowed] = useState(null);
  const [balance, setBalance] = useState(undefined);
  const [Provider, setProvider] = useState(
    address ? "" : new ethers.providers.JsonRpcProvider(ENV.goerliRPC)
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const web3Modal = useMemo(
    () =>
      typeof window !== "undefined" && new Web3Modal({ cacheProvider: true }),
    []
  );
  const nav = useNavigate();
  // const chainID = 97;
  // const chainID = ENV.stakeChainID;
  /* This effect will fetch wallet address if user has already connected his/her wallet */
  useEffect(() => {
    async function checkConnection() {
      try {
        if (window && window.ethereum) {
          // Check if web3modal wallet connection is available on storage
          if (localStorage.getItem(web3modalStorageKey)) {
            await connectToWallet("reload");
          }
        } else {
          console.log("window or window.ethereum is not available");
        }
      } catch (error) {
        console.log(error, "Catch error Account is not connected");
      }
    }
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkWhiteList = useCallback(async () => {
    try {
      if (!address) throw Error("No address");
      const res = await apiService.checkWhiteList(address);
      setWhiteList(res?.data?.isWL);

      return res?.data?.isWL;
    } catch (err) {
      console.error("checkWhiteList", err);
    }
  }, [address]);

  useEffect(() => {
    checkWhiteList();
  }, [checkWhiteList]);

  const setWalletAddress = async (provider) => {
    try {
      const signer = provider.getSigner();
      if (signer) {
        const web3Address = await signer.getAddress();
        setAddress(web3Address);
        getBalance(provider, web3Address);
      }
    } catch (error) {
      console.log(
        "Account not connected; logged from setWalletAddress function"
      );
    }
  };

  const getBalance = useCallback(async (provider, walletAddress) => {
    const walletBalance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(walletBalance);
    setBalance(balanceInEth);
  }, []);

  const disconnectWallet = useCallback(() => {
    setIsAllowed(null);
    setAddress(undefined);
    // Clear event:
    Provider.provider._events = {};
    web3Modal && web3Modal.clearCachedProvider();
  }, [Provider.provider, web3Modal]);

  const checkIfExtensionIsAvailable = () => {
    if (
      (window && window.web3 === undefined) ||
      (window && window.ethereum === undefined)
    ) {
      setError(true);
      web3Modal && web3Modal.toggleModal();
    }
  };

  const connectToWallet = async (type) => {
    try {
      setLoading(true);
      checkIfExtensionIsAvailable();
      const connection = web3Modal && (await web3Modal.connect());
      const provider = new ethers.providers.Web3Provider(connection);
      //chainId
      let connectChainId = ENV.chainId;

      if (type === "reload") {
        connectChainId = connection.networkVersion;
      }

      if (connection.networkVersion !== connectChainId) {
        await Swal.fire({
          title: "Error",
          icon: "error",
          text: "Wrong network, please switch to ETH",
        });
        await switchNetwork(convertToHex(ENV.chainId), provider.provider);
        // setCurrentChainId(Number(connectChainId));
        // setProvider(provider);
        // setWalletAddress(provider);
        // setLoading(false);
        // if (type !== "reload") {
        //   nav("/stake");
        // }

        // let RequestSend = {
        //   id: 1337,
        //   jsonrpc: "2.0",
        //   method: "wallet_addEthereumChain",
        //   // params: [
        //   //   {
        //   //     chainId: '0x61',
        //   //     chainName: 'Binance Smart Chain TestNet',
        //   //     nativeCurrency: {
        //   //       name: 'Binance Coin',
        //   //       symbol: 'TBNB', // 2-6 characters long
        //   //       decimals: 18,
        //   //     },
        //   //     rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545/'],
        //   //     blockExplorerUrls: ['https://testnet.bscscan.com/'],
        //   //   },
        //   // ],
        //   params: [
        //     {
        //       ...ENV.networkInfos[convertToHex(Number(ENV.chainId))],
        //     },
        //   ],
        // };
        // connection.request(RequestSend);
        //return;
      }
      setCurrentChainId(
        type === "reload" ? Number(connection.networkVersion) : ENV.chainId
      );
      await subscribeProvider(connection);
      setProvider(provider);
      setWalletAddress(provider);
      setLoading(false);
      if (type !== "reload") {
        nav("/stake");
      }
    } catch (error) {
      setLoading(false);
      console.log(
        error,
        "Got this error on connectToWallet catch block while connecting the wallet"
      );
    }
  };

  const getProvider = useCallback(() => {
    if (!web3Modal) {
      return;
    }

    web3Modal.connect().then((connection) => {
      const provider = new ethers.providers.Web3Provider(connection);
      setProvider(provider);
      const signer = provider.getSigner();
      if (signer) {
        signer.getAddress().then((address) => getBalance(provider, address));
      }
    });
  }, [getBalance, web3Modal]);

  const subscribeProvider = async (connection) => {
    connection.on("close", () => {
      disconnectWallet();
    });
    connection.on("accountsChanged", async (accounts) => {
      getProvider();
      if (accounts?.length) {
        setAddress(accounts[0]);
        getBalance();
        const provider = new ethers.providers.Web3Provider(connection);
        getBalance(provider, accounts[0]);
      } else {
        disconnectWallet();
      }
    });
    connection.on("networkChanged", async (chainId) => {
      getProvider();
      setCurrentChainId(Number(chainId));
    });
  };

  async function WallectConnect() {
    await WallectConnectProvider.enable();
    const provider = new ethers.providers.Web3Provider(WallectConnectProvider);
    await subscribeProvider(provider);
    const chainID = (await provider.detectNetwork()).chainId;
    setCurrentChainId(chainID);
    setProvider(provider);
    setWalletAddress(provider);

    WallectConnectProvider.on("accountsChanged", async (accounts) => {
      getProvider();
      console.log(accounts);
    });

    // Subscribe to chainId change
    WallectConnectProvider.on("chainChanged", (chainId) => {
      getProvider();
      setCurrentChainId(Number(chainId));
      console.log(chainId);
    });

    // Subscribe to session connection
    WallectConnectProvider.on("connect", () => {
      console.log("connect");
    });

    // Subscribe to session disconnection
    WallectConnectProvider.on("disconnect", (code, reason) => {
      disconnectWallet();
    });
  }

  const addConnection = useCallback(async (provider, networkInfo) => {
    return provider.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...(networkInfo.details || {}),
        },
      ],
    });
  }, []);

  const switchNetwork = useCallback(
    (chainId, currrentProvider = null) => {
      const provider = currrentProvider ?? Provider.provider;

      if (!provider) {
        throw new Error("Invalid provider");
      }

      if (!provider.isMetaMask) {
        return;
      }

      return new Promise((resolve, reject) => {
        provider
          .request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainId }],
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            if (error.code === 4902 || (mobile() && error.code === -32603)) {
              return addConnection(
                provider,
                ENV.networkInfos[chainId] ||
                  ENV.networkInfos?.[convertToHex(Number(ENV.chainId))]
              ).catch((addConnectError) => {
                reject(addConnectError);
              });
            }

            reject(error);
          });
      });
    },
    [Provider.provider, addConnection]
  );

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        loading,
        error,
        Provider,
        isAllowed,
        currentChainId,
        connectToWallet,
        disconnectWallet,
        WallectConnect,
        setIsAllowed,
        iswhiteList,
        checkWhiteList,
        switchNetwork,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WallectConnect;
