import React from 'react';
import {Link} from 'react-router-dom';
import { getClosest, getSiblings, slideToggle, slideUp } from '../../utils/utils';

const MenuItem = ({item, toggle})=> {

  // Submenu Toggle Handler
  const menuExpandHandler = (e) => {
    const target = e.currentTarget;
    const parentEl = target.parentElement;
    if (
      parentEl?.classList.contains("vs-mean-expand") ||
      target.classList.contains("vs-mean-expand")
    ) {
      const element = target.classList.contains("icon") ? parentEl : target;
      const parent = getClosest(element, "li");
      const childNodes = parent.childNodes;
      const parentSiblings = getSiblings(parent);
      parentSiblings.forEach((sibling) => {
        if (sibling.classList.contains("active")) {
          sibling.classList.remove("active");
        }
        const sibChildNodes = sibling.childNodes;
        sibChildNodes.forEach((child) => {
          if (child.nodeName === "UL") {
            slideUp(child, 400);
          }
        });
      });
      childNodes.forEach((child) => {
        if (child.nodeName === "UL") {
          slideToggle(child, 400);
        }
      });
      parent.classList.toggle("active");
    }
  };

  if (item.subMenu) {
    return (
      <li className="menu-item-has-children">
        <Link to={item.path || "#"}>{item.name}</Link>
        {toggle && <span className="vs-mean-expand" onClick={menuExpandHandler}></span>}
        <ul className="sub-menu">
          {item.subMenu.map((child, index) => (
            <MenuItem key={index} item={child} />
          ))}
        </ul>
      </li>
    );
  } else {
    return (
      <li>
        <Link to={item.path || "#"}>{item.name}</Link>
      </li>
    );
  }
}

export default MenuItem;