import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate();
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
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/dashboard");
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
          />
        </label>
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
        <button type="submit" className="auth-submit">
          {signup ? "Ustvari račun" : "Prijava"}
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
