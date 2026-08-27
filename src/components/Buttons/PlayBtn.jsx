import React, {useState} from 'react';
import {VideoModal} from '../';

const PlayBtn = ({path, className, children}) => {

  const [modalShow, setModalShow] = useState(false);

  const modalOpenHandler = ()=> {
    setModalShow(true);
  }

  const modalCloseHandler = ()=> {
    setModalShow(false);
  }
  
  return (    
    <React.Fragment>
      {modalShow && <VideoModal show={modalShow} onHide={modalCloseHandler} videoLink={path}/>}
      <button className={`play-btn ${className || ''}`} onClick={modalOpenHandler} >
        {children}
      </button>
    </React.Fragment>
  );
}

export default PlayBtn;