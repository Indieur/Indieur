import React from 'react';
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";

const VideoModal = ({ videoLink, onHide, show, ...restProps})=> (
  <Modal className="video-modal" {...restProps}
    show={show}
    onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered>
    <Modal.Body>
      <ReactPlayer url={videoLink} className='react-player' width='100%' height='100%' controls playing />
      <button className="modal-closer" onClick={onHide}><i className="far fa-times" /></button>
    </Modal.Body>
  </Modal>
);

export default VideoModal;