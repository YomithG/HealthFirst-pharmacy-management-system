import React from "react";
import { Link } from "react-router-dom";
import "./SupplierManagement.css";
import "./Header.css";

function Header() {
  return (
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Orders
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/add" className="nav-link">
          Request Form
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/sold-out" className="nav-link">
          Sold-Out Lists
        </Link>
      </li>

    </ul>
  );
}

export default Header;
