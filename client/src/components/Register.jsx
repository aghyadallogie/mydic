import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../store/actions/authActions";
import { UserInfoInput } from "./UserInfoInput";
import { Flags } from "./Flags";

export const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errMsg = useSelector((state) => state.auth.errMsg);

  const [stage, setStage] = useState(1);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    languages: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        {stage === 1 ? (
          <div>
            <UserInfoInput newUser={newUser} setNewUser={setNewUser} />
            <button
              style={styles.submit}
              onClick={(e) => {
                e.preventDefault();
                setStage(2);
              }}
            >
              Next
            </button>
          </div>
        ) : (
          <div>
            <Flags newUser={newUser} setNewUser={setNewUser} />
            <button
              style={styles.submit}
              onClick={(e) => {
                e.preventDefault();
                setStage(1);
              }}
            >
              Back
            </button>
            <button style={styles.submit}>Sign Up</button>
          </div>
        )}
      </div>

      <p>
        You already have an account? Go login <Link to="/login">here</Link>
      </p>
    </form>
  );
};
