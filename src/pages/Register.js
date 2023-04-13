import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { login, register } from "../features/user/userSlice";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: true,
  };
  const [value, setValue] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, isMember, password } = value;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please Fill Out All Fields");
    }
    if (isMember) {
      console.log("is menber");
      return dispatch(login({ email, password }));
    }

    return dispatch(register({ name, email, password }));
  };
  const handlechange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const togglemember = (e) => {
    e.preventDefault();
    return setValue({ ...value, isMember: !value.isMember });
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    }
  }, [user]);
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h3> {value.isMember ? "Login" : "Register"}</h3>
        {value.isMember ? (
          ""
        ) : (
          <FormRow
            name="name"
            type="text"
            value={value.name}
            handlechange={handlechange}
          />
        )}
        <FormRow
          name="email"
          type="text"
          value={value.email}
          handlechange={handlechange}
        />
        <FormRow
          name="password"
          type="text"
          value={value.password}
          handlechange={handlechange}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-block"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(login({ email: "testUser@test.com", password: "secret" }));
          }}
        >
          {isLoading ? "loading..." : "demo"}
        </button>
        <p>
          {value.isMember ? "Not a member yet?" : "Already a member"}
          <button className="member-btn" onClick={(e) => togglemember(e)}>
            {!value.isMember ? "Login" : "Register"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
