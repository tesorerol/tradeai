const ENV_DEV = {
  // blockchain
  nftContractAddress: "0x774e35214afefe808196219d1b85485d0c4a34e0",
  stakingContractAddress: "0x087a43e7786ebeacf1d1df8cd27bfcb3126cae16",
  chainIdRPC: "https://ethereum-goerli.publicnode.com",
  chainId: "5",

  // backend
  baseURL: "http://34.202.74.117:3333/api",
  waitingCrawlTime: 20000,

  //staking
  keyStaking: 2022,

  // deposit chain
  depositChainId: 97,
  networkInfos: {
    "0x61": {
      chainId: "0x61",
      chainName: "Binance Smart Chain Testnet",
      nativeCurrency: {
        name: "Binance Coin",
        symbol: "BNB", // 2-6 characters long
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    },
    "0x5": {
      chainId: "0x5",
      chainName: "Ethereum",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: [],
      blockExplorerUrls: ["https://goerli.etherscan.io"],
    },
  },
};

export default ENV_DEV;
