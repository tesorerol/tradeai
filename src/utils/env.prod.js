const ENV_PROD = {
  // blockchain
  nftContractAddress: "0xa88b82af76ecf08cf652846d10857eaeeca40c97",
  stakingContractAddress: "0x909106B3366C76C1d17645D0C489eB78f58bD294",
  chainIdRPC: "https://mainnet.infura.io/v3/e43e5aa80c4c4e3ca72ef2641b2d23e9",
  chainId: "1",

  // backend
  baseURL: "http://34.202.74.117:3333/api",
  waitingCrawlTime: 20000,

  //staking
  keyStaking: 202378961452,

  // deposit chain
  depositChainId: 56,
  networkInfos: {
    "0x38": {
      chainId: "0x38",
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
    "0x1": {
      chainId: "0x1",
      chainName: "Ethereum",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.infura.io/v3/e43e5aa80c4c4e3ca72ef2641b2d23e9"],
      blockExplorerUrls: ["https://etherscan.io/"],
    },
  },
};

export default ENV_PROD
