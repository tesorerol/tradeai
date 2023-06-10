import { Modal } from 'antd';
import React from 'react';
import '../styles/index.scss';


const ModalListNft = (props) => {
  const { children, footer, wrapClassName } = props;

  return (
    <Modal
      closable={true}
      footer={footer ? footer : null}
      destroyOnClose={true}
      maskClosable={false}
      {...props}
      wrapClassName={`${wrapClassName ?? ''}`}
    >
      {children}
    </Modal>
  );
};

export default ModalListNft;
