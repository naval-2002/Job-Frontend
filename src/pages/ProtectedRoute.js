import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Me } from "../features/user/userSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => {
    return state.user;
  });
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(Me());
  // }, []);
  if (user) {
    return children;
  } else if (!user) {
    return <Navigate to="/landing" />;
  }
}

export default ProtectedRoute;
