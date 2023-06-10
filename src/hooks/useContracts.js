import { useContext, useEffect, useState } from "react";

import { WalletContext } from "../Providers/WallectConnect";
import { getContract } from "../utils/contract";
import NftContractABI from "../abi/NftContractABI.json";
import StakingContractABI from "../abi/StakingContract.json";

import ENV from "../utils/env";

export const useApproveNftAll = () => {
  const { address, Provider } = useContext(WalletContext);
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  const checkApprove = async () => {
    try {
      setLoading(true);
      const nftContract = await getContract(
        ENV.nftContractAddress,
        NftContractABI,
        Provider,
        address
      );
      const isApprove = await nftContract.isApprovedForAll(
        address,
        ENV.stakingContractAddress
      );
      setApproved(isApprove);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleApproveAll = async () => {
    try {
      setLoading(true);
      const nftContract = await getContract(
        ENV.nftContractAddress,
        NftContractABI,
        Provider,
        address
      );
      const tx = await nftContract.setApprovalForAll(
        ENV.stakingContractAddress,
        true
      );
      await tx.wait(1);
      setApproved(true);
      setLoading(false);
      return true;
    } catch (err) {
      console.error("hash error", err);
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    checkApprove();
  }, []);

  return {
    approved,
    loading,
    checkApprove,
    handleApproveAll,
  };
};

export const useContract = () => {
  const { address, Provider } = useContext(WalletContext);
  return {
    contractStake: getContract(
      ENV.stakingContractAddress,
      StakingContractABI,
      Provider,
      address
    ),
    contractNft: getContract(
      ENV.nftContractAddress,
      NftContractABI,
      Provider,
      address
    ),
  };
};
