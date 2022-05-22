import React from "react";
import { Link } from "react-router-dom";


window.onscroll = function(ev) {
  const nav = document.getElementById("nav");
  
  if ((window.innerHeight + window.scrollY) > (document.body.offsetTop+70) * 10) {
    nav.style.opacity = "85%"  
  }else
  // at the bottom of the page
  nav.style.opacity = "100%";  
};
const NavBar = (props) => {
  return (
    <div className="sticky-top opacity-85">
      <nav id="nav" className="navbar navbar-expand navbar-dark bg-dark ">
        <div className="mr-10">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        </div>
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
                style={{
                  backgroundColor: "inherit",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout {props.user.name}
              </button>
            ) : (
              <Link to={"/login"} className="nav-link size">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
