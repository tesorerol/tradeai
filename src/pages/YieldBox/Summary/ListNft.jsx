import { Button as ButtonMui } from "@material-ui/core";
import { Col, Row, Spin, Checkbox } from "antd";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import { antIcon } from ".";
import SectionCarousel from "../Carousel";
import ModalListNft from "../modals/ModalListNft";
import ModalStakeNft from "../modals/ModalStakeNft";
import "../styles/index.scss";
import "./index.scss";
import NftCard from "./NftCard";
import { apiService } from "../../../apis";
import { useApproveNftAll, useContract } from "../../../hooks/useContracts";
import ENV from "../../../utils/env";

import Swal from "sweetalert2";
import { WalletContext } from "../../../Providers/WallectConnect";
import backButton from "../../../assets/icons/back-button.svg";

const ListNft = ({ forceRefresh, setForceRefresh }) => {
  const { address: account } = useContext(WalletContext);

  const [myNftsNotyetStake, setMyNftsNotyetStake] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalListNFT, setModalListNFT] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

  const { approved, handleApproveAll } = useApproveNftAll();

  const { contractStake } = useContract();

  const dataSelected = useMemo(() => {
    return myNftsNotyetStake.filter((item) => item.isChecked);
  }, [myNftsNotyetStake]);

  const fetchNftsIdle = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.listIdle(account);
      if (res?.status === 200) {
        setMyNftsNotyetStake(res.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    fetchNftsIdle();
  }, [fetchNftsIdle, forceRefresh]);

  const onSelectNft = (token_id, checked) => {
    const newData = myNftsNotyetStake.map((item) => {
      if (item.token_id === token_id) return { ...item, isChecked: checked };
      return item;
    });
    setMyNftsNotyetStake(newData);
  };

  const handleSelectAll = () => {
    setMyNftsNotyetStake(
      myNftsNotyetStake.map((item) => ({ ...item, isChecked: true }))
    );
  };

  const handleSelectNone = () => {
    setMyNftsNotyetStake(
      myNftsNotyetStake.map((item) => ({ ...item, isChecked: false }))
    );
  };
  console.log("user approved", approved);

  const handleStake = async () => {
    setLoadingConfirm(true);
    if (!approved) {
      const isApprove = await handleApproveAll();
      if (!isApprove) throw Error("");
    }
    const ids = dataSelected.map((item) => item.token_id);
    if (!ids) throw Error("");
    try {
      const transaction = await contractStake.stakeNFT(ids, ENV.keyStaking);
      await transaction.wait(1);
      setTimeout(async () => {
        // wait crawl data
        setModalListNFT(false);
        setLoadingConfirm(false);
        setForceRefresh(Date.now());
        Swal.fire({
          title: "Success!",
          icon: "success",
        });
      }, ENV.waitingCrawlTime);
    } catch (error) {
      console.error("handleStake", error);
      setLoadingConfirm(false);
      Swal.fire({
        title: "Something went wrong!",
        icon: "error",
      });
      if (error?.code === 4001) {
        Swal.fire({
          title: "User reject",
          icon: "error",
        });
      }
    }
  };

  const renderData = () => {
    return (
      <>
        {myNftsNotyetStake.length > 0 ? (
          <Row gutter={[16, 16]}>
            {myNftsNotyetStake.map((item, index) => {
              return (
                <Col
                  key={item.id}
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <NftCard
                    item={item}
                    showCheckbox={true}
                    onSelect={onSelectNft}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <p className="empty-collection">Wallet Empty!</p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="background-gradient">
        <div className="list-nft">
          <div className="flex title mt-0">
            <div className="text1">IDLE</div>

            <div className="text2">
              <span className="text-select" onClick={handleSelectAll}>
                Select All
              </span>
              <span className="divide">|</span>
              <div className="text-select" onClick={handleSelectNone}>
                Select None
              </div>
            </div>
          </div>
          <div className="flex center">
            <ButtonMui
              disabled={dataSelected.length === 0}
              style={{ cursor: "pointer" }}
              className="button-stake"
              shape="square"
              onClick={() => setOpenModal(true)}
            >
              Stake
            </ButtonMui>
          </div>
          <div className="list">
            {loading && <Spin indicator={antIcon(50)} />}
            {!loading && renderData()}
          </div>
        </div>
      </div>
      <ModalStakeNft
        visible={openModal}
        title="Stake Your NFT"
        footer={[
          <div className="footer">
            <div className="text-explain">
              <p> Stake Your NFT For:</p>
              <div>
                <Checkbox defaultChecked={true} className="time-checkbox">
                  30 days
                </Checkbox>
              </div>
            </div>
            <div className="action">
              <ButtonMui
                className="button-cancel-stake-nft"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </ButtonMui>
              <ButtonMui
                className="button-stake-modal"
                shape="square"
                onClick={() => {
                  setOpenModal(false);
                  setModalListNFT(true);
                  handleStake();
                }}
              >
                Stake Now
              </ButtonMui>
            </div>
          </div>,
        ]}
        wrapClassName="modal-stake-nft"
      >
        <div className="section-carousel-wrapper">
          <div className="section-carousel-title">
            Total: {dataSelected.length} NFTs
          </div>
          <SectionCarousel>
            {dataSelected.map((item, index) => {
              return <NftCard item={item} key={index} showCheckbox={true} />;
            })}
          </SectionCarousel>
        </div>
      </ModalStakeNft>
      <ModalListNft
        visible={openModalListNFT}
        title="Stake Your NFT"
        wrapClassName="modal-list-nft"
        onCancel={() => setModalListNFT(false)}
      >
        <div className="back-button" onClick={() => setModalListNFT(false)}>
          <img src={backButton} alt="back-button" />
        </div>
        <div className="section-list-nft-wrapper">
          <div className="section-list-nft">
            <div className="text-item">Staked NFT(s):</div>
            {dataSelected.map((item, index) => (
              <div className="text-item" key={index}>
                {item.name}
              </div>
            ))}
          </div>
          <div className="line-horizontal"></div>
          <div className="section-button">
            <ButtonMui
              disabled={loadingConfirm}
              className="button-stake-modal"
              shape="square"
              onClick={handleStake}
            >
              {loadingConfirm ? antIcon(24) : "Confirm"}
            </ButtonMui>
          </div>
        </div>
      </ModalListNft>
    </>
  );
};

export default ListNft;
