import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowUpLeft, ArrowUpRight, Workflow } from "lucide-react";
import sculpture from "../../assets/auth-sculpture.svg";

export default function AuthLayout() {
  const signup = useLocation().pathname === "/signup";
  return (
    <main className={`auth-shell ${signup ? "is-signup" : ""}`}>
      <div className="auth-image-panel">
        <img
          className="auth-art"
          src={sculpture}
          alt="Soft silver sphere and sculptural ring on a neutral background"
        />
        <Link className="auth-brand" to="/dashboard">
          <Workflow size={23} />
          <span>
            work<span>IT</span>
          </span>
        </Link>
        <div className="auth-image-caption">
          <span className="auth-kicker">
            A LITTLE STRUCTURE. A LOT MORE CLARITY.
          </span>
          <h2>
            Good work.
            <br />
            Better together.
          </h2>
          <p>
            A quieter place for your projects, your people,
            <br className="desktop-break" /> and everything you’re working
            toward.
          </p>
          <div className="auth-image-footer">
            <span>Make space for what matters.</span>
            <ArrowUpRight size={22} />
          </div>
        </div>
        <span className="image-counter">01 / A fresh perspective</span>
      </div>
      <div className="auth-form-panel">
        <Link className="auth-back" to="/dashboard">
          <ArrowUpLeft size={14} />
          Back to workspace
        </Link>
        <div className="auth-form-position">
          <div className="auth-form-content" key={signup ? "signup" : "login"}>
            <Outlet />
          </div>
        </div>
        <footer className="auth-footer">
          <span>© 2026 workIT</span>
          <span>Made for a more thoughtful workday.</span>
        </footer>
      </div>
    </main>
  );
}
