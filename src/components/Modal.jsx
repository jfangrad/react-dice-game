import React from 'react';

class Modal extends React.Component {
  componentDidMount() {
    this.height = (window.innerHeight - this.modal.offsetHeight) / 2;
    this.width = (window.innerWidth - this.modal.offsetWidth) / 2;
  }

  render() {
    if (!isShowing) return null;

    const { children, isShowing, playAgain, menu } = this.props;

    return (
      <div className="modal" ref={div => this.modal = div} style={{ top: this.height, left: this.width }}>
        {children}
        <div className="btn-container">
          <button className="modal-btn" type="button" onClick={playAgain}>Play Again</button>
          <button className="modal-btn" type="button" onClick={menu}>Menu</button>
        </div>
      </div>
    );
  }
}

export default Modal;
