import axios from "axios";

export const helpFetchMe = async (config) =>
  await axios.get("http://localhost:4000/auth/me", config);

export const helpRegisterUser = async (body, config) =>
  await axios.post("http://localhost:4000/auth/register", body, config);

export const helpLoginUser = async (body, config) =>
  await axios.post("http://localhost:4000/auth/login", body, config);

export const helpTranslate = async (userId, word) =>
  await axios.get(`http://localhost:4000/translate/${userId}/${word}`);
