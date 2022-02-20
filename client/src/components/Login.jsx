import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/authActions";

export const Login = () => {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginAction(newUser));
      setNewUser({
        email: "",
        password: "",
      });
    } catch (error) {
      setResult(error.response.data);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {result?.msg && <p style={styles.tooltip}>{result.msg}</p>}
      {result?.errMsg && (
        <p style={{ ...styles.tooltip, background: "red" }}>{result.errMsg}</p>
      )}

      <input
        value={newUser.email}
        placeholder="enter your email"
        style={styles.input}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        type="email"
      />
      <input
        value={newUser.password}
        placeholder="enter your password"
        style={styles.input}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        type="password"
      />
      <input style={styles.submit} type="submit" value="Sign In" />
      <p>
        You don't have an account yet? Go register{" "}
        <Link to="/register">here</Link>
      </p>
    </form>
  );
};
