import React from 'react';
import MenuItem from "./MenuItem";

// Menu Data
import menuLinks from "../../data/MenuLinks.json";

const MainMenu = ({ className }) => (
  <nav className={`main-menu ${className || ''}`}>
    <ul>
      {menuLinks.map((item, index) => (
        <MenuItem key={index} item={item} />
      ))}
    </ul>
  </nav>
);

export default MainMenu;