import React, {useEffect, useRef} from 'react';

const HeaderSticky = ({children, ...restProps})=> {

  const stickMenu = useRef();

  useEffect(() => {
    let lastScroll = 0;
    
    const toggleStick = () => {      
      let targetMenu = stickMenu.current;
      let position = window.pageYOffset;
      let menuParent = targetMenu.parentNode;
      let menuHeight = menuParent.offsetHeight;
      menuParent.style.minHeight = menuHeight + 'px';
      
      // header Stick after scrolling for 700 pixels
      if (position > 800) {
        menuParent.classList.add('will-sticky');        
        if(position > lastScroll) {
          targetMenu.classList.remove('active');
        } else {
          targetMenu.classList.add('active');
        }
      } else {
        menuParent.style.minHeight = '0px';
        menuParent.classList.remove('will-sticky');
        targetMenu.classList.remove('active');
      }
      lastScroll = position;
    };
    
    window.addEventListener("scroll", toggleStick);

    return () => window.removeEventListener("scroll", toggleStick);
  }, []);
  
  return (
    <div  className="sticky-wrapper " {...restProps}>
      <div className="sticky-active" ref={stickMenu}>
        {children}
      </div>
    </div>
  )
}

export default HeaderSticky;