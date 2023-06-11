import { ButtonBase, Button as ButtonMui } from "@material-ui/core";
import { Col, Row, Spin } from "antd";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import Swal from "sweetalert2";
import { antIcon } from ".";
import { WalletContext } from "../../../Providers/WallectConnect";
import { apiService } from "../../../apis";
import { useApproveNftAll, useContract } from "../../../hooks/useContracts";
import ENV from "../../../utils/env";
import SectionCarousel from "../Carousel";
import ModalListNft from "../modals/ModalListNft";
import ModalStakeNft from "../modals/ModalStakeNft";
import "../styles/index.scss";
import NftCard from "./NftCard";
import "./index.scss";
import backButton from "../../../assets/icons/back-button.svg";

const ListNftStaked = (props) => {
  const { forceRefresh, setForceRefresh } = props;

  const [myStakedNfts, setMyStakedNfts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [openModalListNFT, setModalListNFT] = useState(false);

  const { contractStake } = useContract();
  const { approved, handleApproveAll } = useApproveNftAll();

  const {
    address: account,
    checkWhiteList,
    currentChainId,
  } = useContext(WalletContext);

  const handleUntake = async () => {
    if (!approved) {
      const isApprove = await handleApproveAll();
      if (!isApprove) throw Error("");
    }
    setLoadingConfirm(true);
    const ids = dataSelected.map((item) => item.token_id);
    if (!ids) throw Error("");
    try {
      const transaction = await contractStake.unstakeNFT(ids, ENV.keyStaking);
      await transaction.wait(1);
      setTimeout(async () => {
        // wait crawl data
        setLoading(false);
        setLoadingConfirm(false);
        setModalListNFT(false);
        setForceRefresh(Date.now());
        checkWhiteList();
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

  const fetchNftsActive = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiService.listActive(account);
      if (res?.status === 200) {
        const { data } = res;
        setMyStakedNfts(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [account]);

  useEffect(() => {
    if (account) {
      fetchNftsActive();
    }
  }, [account, fetchNftsActive, forceRefresh]);

  const dataSelected = useMemo(() => {
    return myStakedNfts.filter((item) => item.isChecked);
  }, [myStakedNfts]);

  const onSelectNft = (token_id, checked) => {
    const newData = myStakedNfts.map((item) => {
      if (item.token_id === token_id) {
        return { ...item, isChecked: checked };
      }
      return item;
    });
    setMyStakedNfts(newData);
  };

  const handleSelectAll = () => {
    setMyStakedNfts(myStakedNfts.map((item) => ({ ...item, isChecked: true })));
  };

  const handleSelectNone = () => {
    setMyStakedNfts(
      myStakedNfts.map((item) => ({ ...item, isChecked: false }))
    );
  };

  const renderData = () => {
    return (
      <>
        {myStakedNfts.length > 0 ? (
          <Row gutter={[16, 16]}>
            {myStakedNfts.map((item) => {
              return (
                <Col
                  key={item.token_id}
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
          <p className="empty-collection">No Staked AnarKey!</p>
        )}
      </>
    );
  };

  return (
    <>
      <div className="background-gradient">
        <div className="list-nft">
          <div className="flex title mt-0">
            <div className="text1">ACTIVE</div>
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
              disabled={
                dataSelected.length === 0 ||
                Number(currentChainId) !== Number(ENV.chainId)
              }
              style={{ cursor: "pointer" }}
              className="button-stake"
              shape="square"
              onClick={() => {
                if (Number(currentChainId) !== Number(ENV.chainId)) {
                  return;
                }

                setOpenModal(true);
              }}
            >
              Unstake
            </ButtonMui>
          </div>
          <div className="list">
            {loading ? <Spin indicator={antIcon(50)} /> : renderData()}
          </div>
        </div>
      </div>
      <ModalStakeNft
        visible={openModal}
        title="Unstake Your NFT"
        className="unstake"
        footer={[
          <div className="footer" style={{ borderTop: "none" }}>
            <div className="action">
              <ButtonBase
                className="button-cancel-stake-nft"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </ButtonBase>
              <ButtonBase
                className="button-stake-modal"
                shape="square"
                onClick={() => {
                  setOpenModal(false);
                  setModalListNFT(true);
                }}
              >
                Unstake Now
              </ButtonBase>
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
              return <NftCard item={item} key={index} showCheckbox={false} />;
            })}
          </SectionCarousel>
        </div>
      </ModalStakeNft>
      <ModalListNft
        visible={openModalListNFT}
        // onCancel={() => setModalListNFT(false)}
        title="Unstake Your NFT"
        wrapClassName="modal-list-nft"
      >
        <div className="back-button" onClick={() => setModalListNFT(false)}>
          <img src={backButton} alt="back-button" />
        </div>
        <div className="section-list-nft-wrapper">
          <div className="section-list-nft">
            <div className="text-item">UnStaked NFT(s):</div>
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
              onClick={handleUntake}
            >
              {loadingConfirm ? antIcon(24) : "Confirm"}
            </ButtonMui>
          </div>
        </div>
      </ModalListNft>
    </>
  );
};

export default ListNftStaked;
