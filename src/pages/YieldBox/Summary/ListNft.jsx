import { Button as ButtonMui } from '@material-ui/core';
import { Col, Row, Spin, Tooltip } from 'antd';
import { Button } from 'components/Base/Form/Button';
import Empty from 'components/Empty/EmptySecondary';
import { ETHER_SCAN_URL } from 'constants/network';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getListNftOfUserNotyetStake, getListStake, getPoolStakeDetail } from 'request/pool';
import { alertFailure } from 'store/actions/alert';
import { isEqual2Strings } from 'utils/campaign';
import { getContract } from 'utils/contract';
import { antIcon, STATUS } from '.';
import Erc721ABI from '../../../abi/nft/erc721.json';
import StakingABI from '../../../abi/Staking.json';
import SectionCarousel from '../Carousel';
import { NftDetail } from '../interface';
import ModalListNft from '../modals/ModalListNft';
import ModalStakeNft from '../modals/ModalStakeNft';
import ModalSuccess from '../modals/ModalSuccess';
import '../styles/index.scss';
import './index.scss';
import NftCard from './NftCard';


const ListNft = (props) => {
  const { onStatus, status, onMyNftsNotyetStake, isApprovedNft, onApproved, onPoolDetail } = props;
  const { account, library } = useWeb3ReactLocal();
  const dispatch = useDispatch();

  const [myNftsNotyetStake, setMyNftsNotyetStake] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalListNFT, setModalListNFT] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [txHash, setTxHash] = useState('');

  const [idPoolStake, setIdPoolStake] = useState();
  const [poolDetail, setPoolDetail] = useState();

  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;

  const stakeContractAddress = process.env.REACT_APP_CONTRACT_STAKING ;

  const contractStake = getContract(stakeContractAddress, StakingABI, library, account);

  const wrongNetwork = !isEqual2Strings(appChainID, process.env.REACT_APP_ETH_CHAIN_ID || '');

  const disabledButton = useMemo(() => {
    if (poolDetail && Number(poolDetail?.is_display) === 0) {
      return true;
    }
    const noItemChoose = myNftsNotyetStake.filter((item) => item.isChecked).length < 1;
    return wrongNetwork || noItemChoose;
  }, [myNftsNotyetStake, wrongNetwork, poolDetail]);

  const collectionAddress = useMemo(() => {
    if (myNftsNotyetStake.length > 0) {
      return myNftsNotyetStake[0].address;
    }
    return '';
  }, [myNftsNotyetStake]);

  const contractErc721 = useMemo(() => {
    if (collectionAddress && library) {
      return getContract(collectionAddress, Erc721ABI, library, account);
    }
  }, [collectionAddress, account, library]);

  const dataSelected = useMemo(() => {
    return myNftsNotyetStake.filter((item) => item.isChecked);
  }, [myNftsNotyetStake]);

  useEffect(() => {
    fetchMyNftsNotyetStake();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      fetchMyNftsNotyetStake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    fetchListStake();
  }, []);

  useEffect(() => {
    if (Number(idPoolStake) > 0) {
      fetchDetailPool();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPoolStake]);

  const fetchListStake = async () => {
    try {
      const res = await getListStake();
      if (res?.status === 200 && res?.data?.data) {
        const data = res?.data?.data;
        if (data?.length > 0) {
          const id = data[0]?.id;
          setIdPoolStake(id);
        }
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchDetailPool = async () => {
    try {
      const res = await getPoolStakeDetail(idPoolStake);
      if (res?.status === 200 && res?.data) {
        const poolDetail = res?.data?.pool_detail;
        onPoolDetail(poolDetail);
        setPoolDetail(poolDetail);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const handleApprove = async () => {
    if (contractErc721) {
      onStatus(STATUS.LOADING);
      try {
        const transaction = await contractErc721?.setApprovalForAll(stakeContractAddress, true);
        await transaction.wait(1);
        setLoading(false);
        onStatus(STATUS.SUCCESS);
        onApproved(true);
      } catch (error) {
        onStatus(STATUS.FAIL);
        onApproved(false);
        if (error?.code === 4001) {
          dispatch(alertFailure('User Reject'));
        }
      }
    }
  };

  const fetchMyNftsNotyetStake = async () => {
    try {
      setLoading(true);
      const res = await getListNftOfUserNotyetStake();
      if (res?.status === 200) {
        const { data } = res;
        if (data && data.length >= 0) {
          setMyNftsNotyetStake(data);
          onMyNftsNotyetStake(data);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onSelectNft = (token_id, checked) => {
    const newData = myNftsNotyetStake.map((item) => {
      if (isEqual2Strings(token_id, item.token_id)) return { ...item, isChecked: checked };
      return item;
    });
    setMyNftsNotyetStake(newData);
  };

  const getListNftByChecked = (isChecked) => {
    return myNftsNotyetStake.map((item) => ({
      ...item,
      isChecked,
    }));
  };

  const handleSelectAll = () => {
    if (poolDetail && Number(poolDetail?.is_display) > 0) {
      setMyNftsNotyetStake(getListNftByChecked(true));
    }
  };

  const handleSelectNone = () => {
    setMyNftsNotyetStake(getListNftByChecked(false));
  };

  const handleStake = async () => {
    onStatus(STATUS.LOADING);
    setLoadingConfirm(true);
    const ids = dataSelected.map((item) => item.token_id);
    const key = process.env.REACT_APP_KEY_STAKING || '2022';
    try {
      const transaction = await contractStake.stakeNFT(ids, key);
      setTxHash(transaction?.hash);
      await transaction.wait(1);
      setTimeout(async () => {
        // wait crawl data
        setOpenModalSuccess(true);
        setLoading(false);
        onStatus(STATUS.SUCCESS);
      }, 20000);
    } catch (error) {
      console.error(error);
      setLoadingConfirm(false);
      onStatus(STATUS.FAIL);
      if (error?.code === 4001) {
        dispatch(alertFailure('User Reject'));
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
                  key={index}
                  xs={{ span: 12 }}
                  sm={{ span: 12 }}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  xl={{ span: 8 }}
                  xxl={{ span: 8 }}
                >
                  <NftCard
                    item={item}
                    showCheckbox={isApprovedNft && poolDetail && Number(poolDetail?.is_display) > 0}
                    onSelect={onSelectNft}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Empty text="Wallet Empty!" />
        )}
      </>
    );
  };

  const showTextStake =
    myNftsNotyetStake.length === 0 ||
    (myNftsNotyetStake.length > 0 && isApprovedNft) ||
    !isEqual2Strings(appChainID, process.env.REACT_APP_ETH_CHAIN_ID || '');

  return (
    <>
      <div className="background-gradient">
        <div className="list-nft">
          <div className="flex title mt-0">
            <div className="text1">{'IDLE'}</div>

            <div className="text2">
              <span className="text-select" onClick={handleSelectAll}>
                Select All
              </span>
              &nbsp;|&nbsp;
              <div className="text-select" onClick={handleSelectNone}>
                Select None
              </div>
            </div>
          </div>
          <div className="flex center">
            {showTextStake ? (
              wrongNetwork && myNftsNotyetStake.length ? (
                <Tooltip
                  placement="bottom"
                  title={<div>Please change network to ETH</div>}
                  overlayClassName="custom-tooltip-stake-wrong-network"
                >
                  <div>
                    <Button disabled={true} className="button-stake" shape="square">
                      Stake
                    </Button>
                  </div>
                </Tooltip>
              ) : (
                <Button
                  style={disabledButton ? { cursor: 'no-drop' } : { cursor: 'pointer' }}
                  disabled={disabledButton}
                  className="button-stake"
                  shape="square"
                  onClick={() => setOpenModal(true)}
                >
                  Stake
                </Button>
              )
            ) : (
              <Button className="button-stake" shape="square" onClick={handleApprove} disabled={wrongNetwork}>
                {status === STATUS.LOADING && antIcon(24)}
                {status !== STATUS.LOADING && 'Approve'}
              </Button>
            )}
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
              *After each staking action, you cannot unstake in {poolDetail?.lock_period}{' '}
              {Number(poolDetail?.lock_period) > 1 ? 'hours' : 'hour'}.{' '}
            </div>
            <ButtonMui className="button-cancel-stake-nft" onClick={() => setOpenModal(false)}>
              Cancel
            </ButtonMui>
            <Button
              className="button-stake-modal"
              shape="square"
              onClick={() => {
                setOpenModal(false);
                setModalListNFT(true);
              }}
            >
              Stake Now
            </Button>
          </div>,
        ]}
        wrapClassName="modal-stake-nft"
      >
        <div className="section-carousel-wrapper">
          <div className="section-carousel-title">Total: {dataSelected.length} NFTs</div>
          <SectionCarousel>
            {dataSelected.map((item, index) => {
              return <NftCard item={item} key={index} showCheckbox={false} />;
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
            <Button disabled={loadingConfirm} className="button-stake-modal" shape="square" onClick={handleStake}>
              {loadingConfirm && antIcon(24)}
              {!loadingConfirm && 'Confirm'}
            </Button>
          </div>
        </div>
      </ModalListNft>
      <ModalSuccess
        visible={openModalSuccess}
        wrapClassName="modal-success"
        onCancel={() => {
          setOpenModalSuccess(false);
          setModalListNFT(false);
        }}
      >
        <div className="modal-success-wrapper">
          <div>
            <img src="/images/icons/successfully-icon.svg" alt="icon" />
          </div>
          <div className="title">Staked successfully</div>
          <div
            className="transaction-hash"
            onClick={() => {
              window.open(`${ETHER_SCAN_URL}/tx/${txHash}`, '_blank');
            }}
          >
            <span>View transaction details</span>&nbsp;
            <img src="/images/icons/external-link-icon.svg" alt="icon" />
          </div>
        </div>
      </ModalSuccess>
    </>
  );
};

export default ListNft;
