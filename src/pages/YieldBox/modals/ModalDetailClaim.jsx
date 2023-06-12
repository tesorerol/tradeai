import { Modal } from 'antd';
import React from 'react';
import '../styles/index.scss';

const ModalDetailClaim = (props) => {
  const { children, footer, wrapClassName } = props;

  return (
    <Modal
      footer={footer ? footer : null}
      destroyOnClose={true}
      {...props}
      wrapClassName={`${wrapClassName ?? ''} frac-modal-wrapper-${userTheme}`}
    >
      {children}
    </Modal>
  );
};

export default ModalDetailClaim;
