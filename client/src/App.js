import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantsList from "./components/RestaurantsList";
import AddReview from "./components/AddReview";
import Restaurants from "./components/Restaurants";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);

  async function login(user = null) {
    setUser(user);
  }
  async function logout() {
    setUser(null);
  }
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
            {user ? (
              <a
                href={false}
                onClick={logout}
                className="nav-link"
                style={{ cursor: "pointer" }}
              >
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={<RestaurantsList user={user}/>}
          />
          <Route
            path="/restaurants"
            element={<RestaurantsList user={user}/>}
          />
          
          <Route
          exact
            path="/restaurants/:id/review"
            element={<AddReview user={user}/>}
          />
          <Route
            path="/restaurants/:id"
            element={<Restaurants user={user}/>}
            // element={(props) => <Restaurants {...props} user={user} />}
            // render={(props) => <Restaurants {...props} user={user} />}
          />
          <Route
          exact
            path="/login"
            element={<Login login={login}/>}
            // render={(props) =>(
            //    <Login {...props} login={login} />
            // )}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
