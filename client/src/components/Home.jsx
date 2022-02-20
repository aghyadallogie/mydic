import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../store/actions/authActions";
import { styles } from "./styles";

export const Home = () => {
  const [word, setWord] = useState("");
  const [translations, setTranslations] = useState([]);
  const [errMsg, setErrMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authenticatedUser = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://localhost:4000/translate/${authenticatedUser._id}/${word}`)
      .then((res) => setTranslations(res.data))
      .catch((err) => setErrMsg(err.response.data));
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
      
      <ul style={styles.list}>
        {translations.map((trans) => (
          <li key={trans.language}>
            <p
              style={{
                display: 'inline-block',
                backgroundColor: "green",
                borderBottom: '1px solid gray',
                color: "white",
                padding: "5px 10px",
                fontSize: "22px",
                minWidth: "40px",
                minHeight: "50px",
                margin: '0'
              }}
            >
              {trans.language}:{" "}
            </p>
            <p
              style={{
                display: 'inline-block',
                backgroundColor: "lightgray",
                borderBottom: '1px solid gray',
                color: "blue",
                padding: "5px 10px",
                minWidth: "100px",
                minHeight: "50px",
                fontSize: "22px"
              }}
            >
              {trans.word}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
