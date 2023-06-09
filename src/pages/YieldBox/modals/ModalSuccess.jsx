import { Modal } from "antd";
import React from "react";
import "../styles/index.scss";

const ModalSuccess = (props) => {
  const { children, footer, wrapClassName } = props;

  return (
    <Modal
      // closable={false}
      footer={footer ? footer : null}
      destroyOnClose={true}
      {...props}
      wrapClassName={`${wrapClassName ?? ""}`}
    >
      {children}
    </Modal>
  );
};

export default ModalSuccess;
