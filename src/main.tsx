import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { registerServiceWorker } from "./utils/serviceWorker";

createRoot(document.getElementById("root")!).render(<App />);

// Registra service worker para cache de longo prazo
if (import.meta.env.PROD) {
  registerServiceWorker();
}
