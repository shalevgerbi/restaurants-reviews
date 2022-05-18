import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import RestaurantsList from "./components/RestaurantsList";
import AddReview from "./components/AddReview";
import Restaurants from "./components/Restaurants";
import Login from "./components/Login";
import NavBar from "./components/NavBar";

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
      
      <NavBar user={user} logout={logout}/>

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
          />
          <Route
          exact
            path="/login"
            element={<Login login={login}/>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
