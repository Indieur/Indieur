import React from 'react';
import {Button} from '../';

const SlideNavBtn = ({slideParent})=> {
  
  const nextSlide = ()=> {
    slideParent.current.slickNext();
  }

  const prevSlide = ()=> {
    slideParent.current.slickPrev();
  } 
  
  return (
    <div className="sec-btns">
      <Button className="style4" onclick={prevSlide}><i className="far fa-arrow-left"/>Prev</Button>
      <Button className="style4" onclick={nextSlide}>Next<i className="far fa-arrow-right"/></Button>
    </div>
  );
}

export default SlideNavBtn;