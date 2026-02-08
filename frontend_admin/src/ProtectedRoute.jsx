import React from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if(user === undefined) return null;
  if(!user || user === null || user.role !== "Main Admin") return <Navigate to="/" />;
  return children
}

export default ProtectedRoute