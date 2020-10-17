import React from 'react';
import './image.scss'
class Modal extends React.Component {
  render() {
    const { hideModal, show, children } = this.props
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
      <div className={showHideClassName} onClick={hideModal}>
        <section className="modal-main">
          {children}
        </section>
      </div>
    );
  }
}

export default Modal;
