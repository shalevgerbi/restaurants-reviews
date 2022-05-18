import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {props.user ? (
              <button
                href={null}
                onClick={props.logout}
                className="nav-link"
                style={{backgroundColor:"inherit",border: "none", cursor: "pointer" }}
              >
                Logout {props.user.name}
              </button>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
        </div>
    );
}

export default NavBar;
