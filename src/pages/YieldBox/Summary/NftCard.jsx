import { Checkbox } from 'antd';
import moment from 'moment';
import './index.scss';
import clockIcon from '../../../assets/icons/clock.svg'

const NftCard = (props) => {
  const { item, showCheckbox = false, onSelect } = props;

  const formatDateUnix = (unix) => {
    return moment.unix(unix).format("hh:mm A, DD MMM YYYY");
  };

  return (
    <div
      className="nft-card"
      style={{ cursor: onSelect && showCheckbox ? 'pointer' : 'no-drop' }}
      onClick={() => onSelect && showCheckbox && onSelect(item.token_id, !item.isChecked)}
    >
      <div className="wrapper">
        <img src={item.image_url || `https://xborg.vispx.io/xborg/images/${item?.token_id}.PNG`} alt="nft" className="image" />
        {showCheckbox && <Checkbox checked={!!item.isChecked} className="checkbox" />}
        <div className="collection-name">XBorg NFT</div>
        <div className="name">{item?.name}</div>
        {item?.staked_at && (
          <div className="date">
            <img src={clockIcon} alt="icon-date" /> {formatDateUnix(Number(item.staked_at))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NftCard;
