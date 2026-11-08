import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/workspace.css";
import "./styles/auth.css";
import "./styles/interactions.css";
import "./styles/account.css";
import "./styles/profile.css";
import "./styles/roles.css";
import "./styles/dashboard.css";
import "./styles/theme.css";
import "./styles/my-day.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
