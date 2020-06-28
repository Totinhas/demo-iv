import React from "react";

import { NavLink } from "react-router-dom";

import "./NavBar.css";
const NavBar = () => (
  <nav>
    <ul>
      <li>
        <NavLink to="/demo-iv" exact>
          {" "}
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/demo-iv/game"> Game</NavLink>
      </li>
      <li>
        <NavLink to="/demo-iv/settings"> Settings</NavLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
