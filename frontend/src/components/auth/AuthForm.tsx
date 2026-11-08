import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { RoleId } from "../../types/auth";

export default function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  return (
    <>
      <div className="auth-form-heading">
        <h1>{signup ? "Prostor za dobro delo." : "Dobrodošli nazaj."}</h1>
        <p>
          {signup
            ? "Ustvarite račun za bolj zbrano delo."
            : "Nov dan. Jasnejši pregled. Začnimo."}
        </p>
      </div>
      <form
        className="auth-form"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setSubmitting(true);
          const values = new FormData(event.currentTarget);
          try {
            if (signup) {
              await register({
                name: String(values.get("name") || ""),
                email: String(values.get("email") || ""),
                password: String(values.get("password") || ""),
                role: String(values.get("role") || "employee") as RoleId,
              });
            } else {
              await login(
                String(values.get("email") || ""),
                String(values.get("password") || ""),
              );
            }
            navigate("/dashboard", { replace: true });
          } catch (reason) {
            setError(reason instanceof Error ? reason.message : "Prijava ni uspela.");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {signup && (
          <label htmlFor="full-name">
            Ime in priimek
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Vaše ime in priimek"
              required
            />
          </label>
        )}
        <label htmlFor="email">
          Službeni e-naslov
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ime@podjetje.si"
            required
          />
        </label>
        <label htmlFor="password">
          Geslo
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={signup ? "new-password" : "current-password"}
            placeholder={signup ? "Ustvarite geslo" : "Vnesite geslo"}
            minLength={8}
            required
          />
        </label>
        {signup && (
          <label htmlFor="role">
            Vloga
            <select id="role" name="role" defaultValue="employee" required>
              <option value="employee">Zaposleni</option>
              <option value="project-manager">Vodja projekta</option>
              <option value="company-manager">Vodja podjetja</option>
            </select>
          </label>
        )}
        {!signup && (
          <div className="auth-form-options">
            <label className="remember-label">
              <input type="checkbox" />
              Zapomni si me
            </label>
            <Link to="/forgot-password" className="plain-button">
              Pozabljeno geslo?
            </Link>
          </div>
        )}
        {signup && (
          <p className="auth-consent">
            Skupen prostor za bolj organiziran delovnik.
            <br />
            Vaše delo. Vaša ekipa. Jasnejši pregled.
          </p>
        )}
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button type="submit" className="auth-submit" disabled={submitting}>
          {submitting ? "Počakajte …" : signup ? "Ustvari račun" : "Prijava"}
          <ArrowRight size={17} />
        </button>
      </form>
      <div className="auth-switch">
        <span>{signup ? "Ste že del ekipe?" : "Ste novi v workIT?"}</span>
        <Link to={signup ? "/login" : "/signup"}>
          {signup ? "Prijava" : "Ustvarite račun"}
          <ArrowRight size={13} />
        </Link>
      </div>
    </>
  );
}
