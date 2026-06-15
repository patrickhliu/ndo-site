import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/index.css";
import "./assets/pat.scss";
import "./assets/yet-another-react-lightbox.css";

createRoot(document.getElementById("root")).render(<App />);
