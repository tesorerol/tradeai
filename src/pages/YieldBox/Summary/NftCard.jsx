import { Checkbox } from "antd";
import moment from "moment";
import "./index.scss";
import clockIcon from "../../../assets/icons/clock.svg";

const NftCard = (props) => {
  const { item, showCheckbox = false, onSelect } = props;

  const formatDateUnix = (unix) => {
    return moment.unix(unix).format("hh:mm A, DD MMM YYYY");
  };

  return (
    <div
      className="nft-card"
      style={{ cursor: onSelect && showCheckbox ? "pointer" : "no-drop" }}
      onClick={() =>
        onSelect && showCheckbox && onSelect(item.token_id, !item.isChecked)
      }
    >
      <div className="wrapper">
        <img
          src={
            item.image_url ||
            `https://xborg.vispx.io/xborg/images/${item?.token_id}.PNG`
          }
          alt="nft"
          className="image"
        />
        {showCheckbox && (
          <Checkbox checked={!!item.isChecked} className="checkbox" />
        )}
        <div title={"AnarKey"} className="collection-name">
          AnarKey
        </div>
        <div title={item?.name} className="name">
          {item?.name}
        </div>
        <div
          title={item?.staked_at ? formatDateUnix(Number(item.staked_at)) : ""}
          className="date"
        >
          {item?.staked_at && (
            <>
              <img src={clockIcon} alt="icon-date" />{" "}
              {formatDateUnix(Number(item.staked_at))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NftCard;
