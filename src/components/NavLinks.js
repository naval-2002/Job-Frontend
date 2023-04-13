import { NavLink } from "react-router-dom";
import links from "../utils/Links";

import React from "react";

function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {links.map((val) => {
        const { path, id, text, icon } = val;
        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;
