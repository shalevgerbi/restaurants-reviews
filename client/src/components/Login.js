import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const initialUserState = {
    name: "",
    id: "",
  };

  const [user, setUser] = useState(initialUserState);
  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //check if there is an empty input and login with the function login that passed from props
  const login = () => {
    if (user.id === "" && user.name === "") {
      alert("must add parameters to Username and id");
      return;
    } else if (user.id === "") {
      alert("must add parameters to id");
      return;
    } else if (user.name === "") {
      alert("must add parameters to Username");
      return;
    }
    props.login(user);
    navigate("/");
  };
  return (
    <div className="submit-form w-50 mx-auto">
      <div>
        <div className="form-group ">
          <label htmlFor="user">User Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
            onKeyDown={(e) => (e.code === "Enter" ? login() : null)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
            onKeyDown={(e) => (e.code === "Enter" ? login() : null)}
          />
        </div>
        <button onClick={login} className="btn btn-success d-flex mx-auto mt-2">
          Login
        </button>
      </div>
    </div>
  );
}
