import React from 'react';
import './image.scss'
class Modal extends React.Component {
  render() {
    const { hideModal, show, children } = this.props
    const showHideClassName = show ? "display-block" : "display-none";
    return (
      <div className={showHideClassName} >
        <section className="modal-main" >
          {children}
          <button style={{position: 'absolute',
            top: '8px',
            right: '16px'}}
            onClick={hideModal}>x</button>
        </section>
      </div>
    );
  }
}

export default Modal;
