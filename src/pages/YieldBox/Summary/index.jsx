import { LoadingOutlined } from "@ant-design/icons";
import { Col, Progress, Row } from "antd";
import BigNumber from "bignumber.js";
// import { useWeb3ReactLocal } from "hooks/useWeb3ReactLocal";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
// import { getStakedInfo } from "request/pool";
// import { getContract } from "utils/contract";
// import { formatRoundFloorInteger } from "utils/formatNumber";
import Erc721ABI from "../../../abi/nft/erc721.json";
import "./index.scss";
import ListNft from "./ListNft";
import ListNftStaked from "./ListNftStaked";

const iconWhite = "/images/icons/summary-logo-white.svg";
const iconDiamond = "/images/icons/summary-logo-diamond.svg";
const iconBlur = "/images/icons/summary-logo-blur.svg";

export const antIcon = (size = 50) => {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <LoadingOutlined style={{ fontSize: size }} spin />
      </div>
    </>
  );
};

export const MAX_NFT = 2500;
export const STATUS = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
};

// const textDefault = "###";

export const MESSAGE_CANNOT_STAKE_OR_UNSTAKE =
  "Please you switch correct networks is ETH";

const Summary = (props) => {
  const [stakedInfo, setStakedInfo] = useState({
    multiplier: 0,
    totalNft: MAX_NFT,
    staked: 0,
    stakedTotal: "0",
    null: "0",
  });
  const [status, setStatus] = useState("");
  const [myNftsNotyetStake, setMyNftsNotyetStake] = useState([]);
  const [myStakedNfts, setMyStakedNfts] = useState([]);
  const [isApprovedNft, setIsApproveNft] = useState(false);
  const [poolDetail, setPoolDetail] = useState();

  // const { account, library } = useWeb3ReactLocal();
  // const stakeContractAddress = process.env.REACT_APP_CONTRACT_STAKING;

  // const collectionAddress = useMemo(() => {
  //   if (myNftsNotyetStake.length > 0 || myStakedNfts.length > 0) {
  //     return myNftsNotyetStake[0]?.address || myStakedNfts[0]?.address;
  //   }
  //   return "";
  // }, [myNftsNotyetStake, myStakedNfts]);

  // const contractErc721 = useMemo(() => {
  //   if (collectionAddress && library) {
  //     return getContract(collectionAddress, Erc721ABI, library, account);
  //   }
  // }, [collectionAddress, account, library]);

  // useEffect(() => {
  //   if (contractErc721) {
  //     checkUserIsApproved();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [contractErc721]);

  // useEffect(() => {
  //   if (status === STATUS.SUCCESS) {
  //     console.log("RECALL DATA STAKED");
  //     fetchStaked();
  //   }
  // }, [status]);

  // useEffect(() => {
  //   fetchStaked();
  // }, []);

  // const checkUserIsApproved = async () => {
  //   const transaction = await contractErc721?.isApprovedForAll(
  //     account,
  //     stakeContractAddress
  //   );
  //   setIsApproveNft(transaction);
  // };

  const getStatusActionCallSC = (status) => {
    setStatus(status);
  };

  const handleMyStakedNfts = (data) => {
    setMyStakedNfts(data);
  };

  const handleMyNftsNotyetStake = (data) => {
    setMyNftsNotyetStake(data);
  };

  const handleApprove = (approved) => {
    setIsApproveNft(approved);
  };

  // const fetchStaked = async () => {
  //   try {
  //     const res = await getStakedInfo();
  //     if (res?.status === 200) {
  //       const { data } = res;
  //       if (!isEmpty(data)) {
  //         setStakedInfo(data);
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const percent = 0;

  // const percent = useMemo(() => {
  //   if (Number(poolDetail?.is_display_nft_stake) > 0) {
  //     return new BigNumber(poolDetail?.total_nft_stake || 0)
  //       .div(stakedInfo.totalNft)
  //       .multipliedBy(100)
  //       .toFixed(2);
  //   } else {
  //     if (stakedInfo.totalNft === 0) {
  //       return 0;
  //     }
  //     return new BigNumber(stakedInfo.stakedTotal)
  //       .div(stakedInfo.totalNft)
  //       .multipliedBy(100)
  //       .toFixed(2);
  //   }
  // }, [
  //   stakedInfo,
  //   poolDetail?.is_display_nft_stake,
  //   poolDetail?.total_nft_stake,
  // ]);

  const handlePoolDetail = (data) => {
    setPoolDetail(data);
  };

  const formatRoundFloorInteger = (value) => value

  return (
    <Row gutter={[16, 16]}>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 10 }}
        xxl={{ span: 10 }}
      >
        <ListNft
          isApprovedNft={isApprovedNft}
          onStatus={getStatusActionCallSC}
          status={status}
          onMyNftsNotyetStake={handleMyNftsNotyetStake}
          onApproved={handleApprove}
          onPoolDetail={handlePoolDetail}
        />
      </Col>
      <Col
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 10 }}
        xxl={{ span: 10 }}
      >
        <ListNftStaked
          isApprovedNft={isApprovedNft}
          onStatus={getStatusActionCallSC}
          status={status}
          onMyStakedNfts={handleMyStakedNfts}
          onApproved={handleApprove}
          poolDetail={poolDetail}
        />
      </Col>
      <Col
        className="xborg"
        xs={{ span: 16 }}
        sm={{ span: 10 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
        xl={{ span: 4 }}
        xxl={{ span: 4 }}
      >
        <div className="background-image">
          <div className="title">
            <span>XBorg</span>
          </div>
          <div className="progress-section">
            <Progress
              type="circle"
              strokeColor={{
                " 0%": "#B347FF",
                "48.44%": "#454CF9",
                "100%": "#02ACD3",
              }}
              percent={Number(percent)}
              strokeWidth={8}
              width={140}
              trailColor="#06071C"
              format={() => {
                return (
                  <>
                    <div>
                      {Number(poolDetail?.is_display_nft_stake) > 0
                        ? Number(poolDetail?.total_nft_stake)
                        : stakedInfo.stakedTotal}
                    </div>
                    <div className="staked">STAKED</div>
                  </>
                );
              }}
              className="progress"
            />
          </div>
          <div className="total">TOTAL: {stakedInfo.totalNft}</div>
        </div>

        <div className="des">
          <span className="weight-500 font-size-18">
            Staked:{" "}
            <span className="weight-700 font-size-18">
              {stakedInfo?.staked || 0}
            </span>
          </span>
          <br />
          <span className="weight-500 font-size-14">
            Common:{" "}
            <span className="weight-700 font-size-14">
              {stakedInfo?.Common || 0}
            </span>
          </span>
          <br />
          <span className="weight-500 font-size-14">
            Rare:{" "}
            <span className="weight-700 font-size-14">
              {stakedInfo?.Rare || 0}
            </span>
          </span>
          <br />
          <span className="weight-500 font-size-14">
            Elite:{" "}
            <span className="weight-700 font-size-14">
              {stakedInfo?.Elite || 0}
            </span>
          </span>
          <br />
          <span className="weight-500 font-size-14">
            1:1:{" "}
            <span className="weight-700 font-size-14">
              {stakedInfo?.Special || 0}
            </span>
          </span>
          <br />
          <br />
          <div className="weight-500 font-size-18">
            Multiplier:&nbsp;
            <span className="weight-700 font-size-18">
              {stakedInfo?.multiplier
                ? Number(
                    formatRoundFloorInteger(String(stakedInfo?.multiplier))
                  )
                : "0"}
              x
            </span>
          </div>
          <br />
          <div
            className="weight-700 font-size-14"
            style={{
              color: "#0961FE",
              cursor: "pointer",
              textDecoration: "underline",
              textAlign: "center",
            }}
            onClick={() =>
              window.open("https://opensea.io/collection/xborg-nft", "_blank")
            }
          >
            Increase your yield
          </div>
          <div className="icon-section">
            <img
              src={iconWhite}
              alt="icon"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://opensea.io/collection/xborg-nft", "_blank")
              }
            />
            <img
              src={iconDiamond}
              alt="icon"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open(
                  "https://looksrare.org/collections/0xb452Ff31B35Dee74f2FdfD5194B91Af1BaD07b91",
                  "_blank"
                )
              }
            />
            <img
              src={iconBlur}
              alt="icon"
              style={{ cursor: "pointer" }}
              onClick={() =>
                window.open("https://blur.io/collection/xborg-nft", "_blank")
              }
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Summary;
