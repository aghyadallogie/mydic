import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../store/actions/authActions";
import de from "../flags/de.png";
import fr from "../flags/fr.png";
import it from "../flags/it.png";
import ja from "../flags/ja.png";
import pl from "../flags/pl.png";
import pt from "../flags/pt.png";
import ru from "../flags/ru.png";
import sv from "../flags/sv.png";
import es from "../flags/es.png";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errMsg = useSelector((state) => state.auth.errMsg);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    languages: [],
  });

  const toggleLanguage = (code) => {
    if (!newUser.languages.includes(code)) {
      setNewUser({ ...newUser, languages: [...newUser.languages, code] });
    } else {
      const filtered = newUser.languages.filter((lang) => lang !== code);
      setNewUser({ ...newUser, languages: filtered });
    }
  };

  const resources = [
    { code: "de", flag: de },
    { code: "fr", flag: fr },
    { code: "it", flag: it },
    { code: "es", flag: es },
    { code: "ja", flag: ja },
    { code: "pl", flag: pl },
    { code: "pt", flag: pt },
    { code: "ru", flag: ru },
    { code: "sv", flag: sv },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    dispatch(registerAction(newUser));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <h1>Register</h1>
      {errMsg && <p style={styles.tooltip}>{errMsg}</p>}

      <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
        <div style={{ padding: "10px" }}>
          <input
            value={newUser.name}
            placeholder="enter your name"
            style={styles.input}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            type="text"
          />
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
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            type="password"
          />
        </div>

        <div style={styles.flags}>
          {resources.map((resource) => (
            <img
              key={resource.code}
              style={
                newUser.languages.includes(resource.code)
                  ? { ...styles.flag, border: "2px solid black" }
                  : { ...styles.flag, border: "2px solid gold" }
              }
              src={resource.flag}
              alt={resource.code}
              onClick={() => toggleLanguage(resource.code)}
            />
          ))}
        </div>
      </div>
      <input style={styles.submit} type="submit" value="Sign Up" />
      <p>
        You already have an account? Go login <Link to="/login">here</Link>
      </p>
    </form>
  );
};
