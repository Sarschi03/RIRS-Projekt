import { Outlet, useLocation } from "react-router-dom";
import gradient from "../../assets/auth-gradient.png";

export default function AuthLayout() {
  const signup = useLocation().pathname === "/signup";
  return (
    <main className={`auth-shell ${signup ? "is-signup" : ""}`}>
      <div className="auth-image-panel">
        <img
          className="auth-art"
          src={gradient}
          alt="Abstraktno ozadje z nežnimi modrimi, rožnatimi in oranžnimi prelivi"
        />
        <div className="auth-image-caption">
          <h2>
            Dobro delo.
            <br /> Skupaj nam gre bolje.
          </h2>
          <p>
            Miren prostor za vaše projekte, sodelavce
            <br className="desktop-break" /> in vse, kar želite doseči.
          </p>
          <div className="auth-image-footer">
            <span>Namenite čas najpomembnejšemu.</span>
          </div>
        </div>
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-position">
          <div className="auth-form-content" key={signup ? "signup" : "login"}>
            <Outlet />
          </div>
        </div>
        <footer className="auth-footer">
          <span>© 2026 workIT</span>
          <span>Za bolj premišljen delovnik.</span>
        </footer>
      </div>
    </main>
  );
}
