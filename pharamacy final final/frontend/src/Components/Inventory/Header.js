import React from "react";
import { Link } from "react-router-dom";
import "./Inventory.css"; 

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/add/inventoryList" className="nav-link" >
                Inventory List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add/medicineList" className="nav-link" >
                Medicine List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add/inventorymedicine" className="nav-link">
                Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add/AddNewMedicine" className="nav-link">
                Medicine
              </Link>
            </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
}

export default Header;
