import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../store/actions/authActions";
import { translateAction } from "../store/actions/translateActions";
import { styles } from "./styles";

export const Home = () => {
  const [word, setWord] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticatedUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const translations = useSelector((state) => state.translate.translations);
  const isLoading = useSelector((state) => state.translate.isLoading);
  const errMsg = useSelector((state) => state.translate.errMsg);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(translateAction(authenticatedUser._id, word));
  };

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  return (
    <div>
      <button style={styles.submit} onClick={() => dispatch(logoutAction())}>
        Logout
      </button>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={word}
          style={styles.input}
          onChange={(e) => setWord(e.target.value)}
        />
        <input type="submit" value="Translate" style={styles.submit} />
      </form>

      {errMsg ? (
        <h3 style={styles.tooltip}>Something went wrong!</h3>
      ) : isLoading ? (
        <p>spinner here ...</p>
      ) : (
        <ul style={styles.list}>
          {translations.map((trans) => (
            <li key={trans.language}>
              <p
                style={{
                  display: "inline-block",
                  backgroundColor: "green",
                  borderBottom: "1px solid gray",
                  color: "white",
                  padding: "5px 10px",
                  fontSize: "22px",
                  minWidth: "40px",
                  minHeight: "50px",
                  margin: "0",
                }}
              >
                {trans.language}:{" "}
              </p>
              <p
                style={{
                  display: "inline-block",
                  backgroundColor: "lightgray",
                  borderBottom: "1px solid gray",
                  color: "blue",
                  padding: "5px 10px",
                  minWidth: "100px",
                  minHeight: "50px",
                  fontSize: "22px",
                }}
              >
                {trans.translation}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
