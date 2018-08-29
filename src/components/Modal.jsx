import React from 'react';

class Modal extends React.Component {
  componentDidMount() {
    const height = this.modal ? this.modal.offsetHeight : 100;
    const width = this.modal ? this.modal.offsetWidth : 100;

    this.height = (window.innerHeight - height) / 2;
    this.width = (window.innerWidth - width) / 2;
  }

  render() {
    const { children, playAgain, menu } = this.props;

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
