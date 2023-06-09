import { Button as ButtonMui } from '@material-ui/core';
import { Col, Row, Spin, Tooltip } from 'antd';
import { Button } from 'components/Base/Form/Button';
import Empty from 'components/Empty/EmptySecondary';
import { ETHER_SCAN_URL } from 'constants/network';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useWeb3ReactLocal } from 'hooks/useWeb3ReactLocal';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getListNftOfUserStaked } from 'request/pool';
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


const ListNftStaked = (props) => {
  const { onStatus, status, onMyStakedNfts, isApprovedNft, onApproved, poolDetail } = props;
  const { account, library } = useWeb3ReactLocal();
  const dispatch = useDispatch();

  const [myStakedNfts, setMyStakedNfts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [openModalListNFT, setModalListNFT] = useState(false);
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const [txHash, setTxHash] = useState<string>('');
  const { appChainID } = useTypedSelector((state) => state.appNetwork).data;

  const stakeContractAddress = process.env.REACT_APP_CONTRACT_STAKING;

  const contractStake = getContract(stakeContractAddress, StakingABI, library, account);

  const wrongNetwork = !isEqual2Strings(appChainID, process.env.REACT_APP_ETH_CHAIN_ID || '');

  const disabledButton = useMemo(() => {
    const noItemChoose = myStakedNfts.filter((item) => item.isChecked).length < 1;
    return wrongNetwork || noItemChoose;
  }, [myStakedNfts, wrongNetwork]);

  const collectionAddress = useMemo(() => {
    if (myStakedNfts.length > 0) {
      return myStakedNfts[0].address;
    }
    return '';
  }, [myStakedNfts]);

  const contractErc721 = useMemo(() => {
    if (collectionAddress && library) {
      return getContract(collectionAddress, Erc721ABI, library, account);
    }
  }, [collectionAddress, account, library]);

  const dataSelected = useMemo(() => {
    return myStakedNfts.filter((item) => item.isChecked);
  }, [myStakedNfts]);

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

  useEffect(() => {
    if (poolDetail) {
      fetchMyNftsNotyetStake();
    }else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, poolDetail?.lock_period]);

  useEffect(() => {
    if (status === STATUS.SUCCESS) {
      fetchMyNftsNotyetStake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const fetchMyNftsNotyetStake = async () => {
    try {
      setLoading(true);
      const res = await getListNftOfUserStaked();
      if (res?.status === 200) {
        const data = res?.data;
        if (data && data.length >= 0) {
          const newData = data?.map((item) => {
            const staked_at = item?.staked_at;
            const lock = poolDetail?.lock_period || 0;
            const dateCanUnstake = moment(Number(staked_at) * 1000).add(Number(lock), 'hours');
            const canUnStake = moment().isAfter(dateCanUnstake);
            return {
              ...item,
              canUnStake,
            };
          });

          setMyStakedNfts(newData || []);
          onMyStakedNfts(newData || []);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const onSelectNft = (token_id, checked) => {
    const newData = myStakedNfts.map((item) => {
      if (isEqual2Strings(token_id, item.token_id)) return { ...item, isChecked: checked };
      return item;
    });
    setMyStakedNfts(newData);
  };

  const getListNftByChecked = (isChecked) => {
    if (isChecked) {
      return myStakedNfts.map((item) => {
        if (item?.canUnStake) {
          return {
            ...item,
            isChecked,
          };
        } else {
          return {
            ...item,
            isChecked: false,
          };
        }
      });
    }
    return myStakedNfts.map((item) => ({
      ...item,
      isChecked,
    }));
  };

  const handleSelectAll = () => {
    setMyStakedNfts(getListNftByChecked(true));
  };

  const handleSelectNone = () => {
    setMyStakedNfts(getListNftByChecked(false));
  };

  const handleUnStake = async () => {
    onStatus(STATUS.LOADING);
    setLoadingConfirm(true);
    const ids = dataSelected.map((item) => item.token_id);
    const key = process.env.REACT_APP_KEY_STAKING || '2022';
    try {
      const transaction = await contractStake.unstakeNFT(ids, key);
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
        {myStakedNfts.length > 0 ? (
          <Row gutter={[16, 16]}>
            {myStakedNfts.map((item, index) => {
              let canUnStake = item?.canUnStake;
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
                  <NftCard item={item} showCheckbox={isApprovedNft && canUnStake} onSelect={onSelectNft} />
                </Col>
              );
            })}
          </Row>
        ) : (
          <Empty text="Stake your XBorg NFT to get rewards!" />
        )}
      </>
    );
  };

  const showTextUnstake =
    myStakedNfts.length === 0 ||
    (myStakedNfts.length > 0 && isApprovedNft) ||
    !isEqual2Strings(appChainID, process.env.REACT_APP_ETH_CHAIN_ID || '');

  return (
    <>
      <div className="background-gradient">
        <div className="list-nft">
          <div className="flex title mt-0">
            <div className="text1">{'ACTIVE'}</div>

            <div className="text2">
              <span
                className="text-select"
                style={{ cursor: isApprovedNft ? 'pointer' : 'no-drop' }}
                onClick={() => {
                  if (isApprovedNft) {
                    handleSelectAll();
                  }
                }}
              >
                Select All
              </span>
              &nbsp;|&nbsp;
              <div
                className="text-select"
                style={{ cursor: isApprovedNft ? 'pointer' : 'no-drop' }}
                onClick={handleSelectNone}
              >
                Select None
              </div>
            </div>
          </div>

          <div className="flex center">
            {showTextUnstake ? (
              wrongNetwork && myStakedNfts.length ? (
                <Tooltip
                  placement="bottom"
                  title={<div>Please change network to ETH</div>}
                  overlayClassName="custom-tooltip-stake-wrong-network"
                >
                  <div>
                    <Button disabled={true} className="button-stake" shape="square">
                      Unstake
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
                  Unstake
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
        title="Unstake Your NFT"
        className="unstake"
        footer={[
          <div className="footer" style={{ borderTop: 'none' }}>
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
              Unstake Now
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
        onCancel={() => setModalListNFT(false)}
        title="Unstake Your NFT"
        wrapClassName="modal-list-nft"
      >
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
            <Button disabled={loadingConfirm} className="button-stake-modal" shape="square" onClick={handleUnStake}>
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
          <div className="title">UnStaked successfully</div>
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

export default ListNftStaked;
