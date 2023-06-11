import { LoadingOutlined } from "@ant-design/icons";
import { Col, Progress, Row } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";

import "./index.scss";
import ListNft from "./ListNft";
import ListNftStaked from "./ListNftStaked";
import { apiService } from "../../../apis";
import { WalletContext } from "../../../Providers/WallectConnect";
import iconWhite from "../../../assets/icons/summary-logo-white.svg";
import iconDiamond from "../../../assets/icons/summary-logo-diamond.svg";
import iconBlur from "../../../assets/icons/summary-logo-blur.svg";
import Swal from "sweetalert2";
import ENV from "../../../utils/env";
import { convertToHex, formatMoney } from "../../../Helpers";

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

export const MESSAGE_CANNOT_STAKE_OR_UNSTAKE =
  "Please you switch correct networks is ETH";

const Summary = (props) => {
  const [forceRefresh, setForceRefresh] = useState();

  const [stakedInfo, setStakedInfo] = useState({
    totalNft: 0,
    staked: 0,
    stakedTotal: 0,
    maxAllocation: 0,
  });

  const {
    address: account,
    currentChainId,
    checkWhiteList,
    switchNetwork,
  } = useContext(WalletContext);

  useEffect(() => {
    if (Number(currentChainId) !== Number(ENV.chainId)) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Wrong network, please switch to ETH",
      }).then(() => {
        switchNetwork(convertToHex(ENV.chainId)).catch((e) => console.error(e));
      });
    }
  }, [currentChainId, switchNetwork]);

  const getUserStakeInfo = useCallback(async () => {
    try {
      if (!account) return;
      const res = await apiService.stakeInfo(account);
      console.log({ account: res.data });
      setStakedInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [account]);

  useEffect(() => {
    getUserStakeInfo();
    checkWhiteList();
  }, [getUserStakeInfo, forceRefresh, checkWhiteList]);

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
          forceRefresh={forceRefresh}
          setForceRefresh={setForceRefresh}
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
          forceRefresh={forceRefresh}
          setForceRefresh={setForceRefresh}
        />
      </Col>
      <Col
        className="anarkey"
        xs={{ span: 16 }}
        sm={{ span: 10 }}
        md={{ span: 6 }}
        lg={{ span: 6 }}
        xl={{ span: 4 }}
        xxl={{ span: 4 }}
      >
        <div className="background-image">
          <div className="title">
            <span>ANARKEY</span>
          </div>
          <div className="progress-section">
            <Progress
              type="circle"
              strokeColor={{
                " 0%": "#246FE5",
                "48.44%": "#246FE5",
                "100%": "#246FE5",
              }}
              percent={
                Number(stakedInfo.stakedTotal / (stakedInfo.totalNft || 1)) *
                100
              }
              strokeWidth={8}
              width={140}
              trailColor="#06071C"
              format={() => {
                return (
                  <>
                    <div>{stakedInfo.stakedTotal}</div>
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
          <span className="weight-500 font-size-18 user-staked">
            Staked:{" "}
            <span className="weight-700 font-size-18">
              {stakedInfo?.staked || 0}
            </span>
          </span>
          <br />
          <span className="weight-500 font-size-18 user-staked">
            Max Allocation:{" "}
            <span className="weight-700 font-size-18">
              {formatMoney(stakedInfo?.maxAllocation || 0, "", 2, ".", ",")}
            </span>
          </span>
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
              window.open("https://opensea.io/collection/anarkey", "_blank")
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
                  "https://looksrare.org/collections/0xA88b82AF76ecF08cf652846D10857eAeeCa40C97",
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
