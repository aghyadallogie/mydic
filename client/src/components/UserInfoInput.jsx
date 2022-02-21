import React from "react";
import { styles } from "./styles";

export const UserInfoInput = ({ newUser, setNewUser }) => {
  return (
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
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        type="password"
      />
    </div>
  );
};
