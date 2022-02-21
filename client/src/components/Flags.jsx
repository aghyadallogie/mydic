import React from "react";
import { styles } from "./styles";
import de from "../flags/de.png";
import fr from "../flags/fr.png";
import it from "../flags/it.png";
import ja from "../flags/ja.png";
import pl from "../flags/pl.png";
import pt from "../flags/pt.png";
import ru from "../flags/ru.png";
import sv from "../flags/sv.png";
import es from "../flags/es.png";

export const Flags = ({ newUser, setNewUser }) => {
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

  const toggleLanguage = (code) => {
    if (!newUser.languages.includes(code)) {
      setNewUser({ ...newUser, languages: [...newUser.languages, code] });
    } else {
      const filtered = newUser.languages.filter((lang) => lang !== code);
      setNewUser({ ...newUser, languages: filtered });
    }
  };

  return (
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
  );
};
