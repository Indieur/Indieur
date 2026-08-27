import React, { Fragment, useState , useRef} from "react";
import Logo from '../Logo/Logo';
import MenuItem from './MenuItem';
import menuLinks from '../../data/MenuLinks.json';
import { getClosest, slideUp } from '../../utils/utils';


const MobileMenu = ()=> {
  const menuParent = useRef(null);

  const [menuOption, setMenuOption] = useState(false);

  // Close The menu and hide the sub menus
  const menuCloseHandler = () => {
    menuParent.current.querySelectorAll(".sub-menu").forEach((el) => {
      const subParent = getClosest(el, "li");
      if (subParent.classList.contains("active")) {
        slideUp(el, 400);
        subParent.classList.remove("active");
      }
    });
    setMenuOption(false);
  };

  // Open Menu On Button Click
  const menuOpenHandler = () => {
    setMenuOption(true);
  };

  return (
    <Fragment>
      <button type="button" onClick={menuOpenHandler} className="vs-menu-toggle d-inline-block d-lg-none">
        <i className="far fa-bars"></i>
      </button>
      <div ref={menuParent} className={`vs-menu-wrapper ${menuOption ? "vs-body-visible" : ""}`}>
        <div className="vs-menu-area text-center">
          <button className="vs-menu-toggle" onClick={menuCloseHandler}>
            <i className="fal fa-times"></i>
          </button>
          <div className="mobile-logo">{<Logo image="/images/indieur_logo.png" />}</div>
          <div className="vs-mobile-menu">
            <ul>
              {menuLinks.map((item, index) => (
                <MenuItem key={index} item={item} toggle/>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


export default MobileMenu;











// <ul>
//   <li className="menu-item-has-children">
//     <Link to="/">Home</Link>
//     <span className="vs-mean-expand" onClick={menuExpandHandler}></span>
//     <ul className="sub-menu">
//       <li>
//         <Link to="/">Home One</Link>
//       </li>
//       <li>
//         <Link to="/hometwo">Home Two</Link>
//       </li>
//       <li>
//         <Link to="/homethree">Home Three</Link>
//       </li>
//     </ul>
//   </li>
//   <li>
//     <Link to="/about">About Us</Link>
//   </li>
//   <li className="menu-item-has-children">
//     <Link to="/blog">Blog</Link>
//     <span className="vs-mean-expand" onClick={menuExpandHandler}></span>
//     <ul className="sub-menu">
//       <li>
//         <Link to="/blog">Blog List</Link>
//       </li>
//       <li>
//         <Link to="/blog-grid">Blog Grid</Link>
//       </li>
//       <li>
//         <Link to="/blog-details">Blog Details</Link>
//       </li>
//     </ul>
//   </li>
//   <li className="menu-item-has-children">
//     <Link to="/">Pages</Link>
//     <span className="vs-mean-expand" onClick={menuExpandHandler}></span>
//     <ul className="sub-menu">
//       <li>
//         <Link to="/price-plan">Pricing Plans</Link>
//       </li>
//       <li>
//         <Link to="/project">Projects</Link>
//       </li>
//       <li>
//         <Link to="/project-details">Projects Details</Link>
//       </li>
//       <li className="menu-item-has-children">
//         <Link to="/service">Service</Link>
//         <span className="vs-mean-expand" onClick={menuExpandHandler}></span>
//         <ul className="sub-menu">
//           <li>
//             <Link to="/blog">Blog List</Link>
//           </li>
//           <li>
//             <Link to="/blog-grid">Blog Grid</Link>
//           </li>
//           <li>
//             <Link to="/blog-details">Blog Details</Link>
//           </li>
//         </ul>
//       </li>
//       <li>
//         <Link to="/service-details">Service Details</Link>
//       </li>
//       <li>
//         <Link to="/team">Team</Link>
//       </li>
//       <li>
//         <Link to="/team-details">Team Details</Link>
//       </li>
//     </ul>
//   </li>
//   <li>
//     <Link to="/contact">Contact Us</Link>
//   </li>
// </ul>;