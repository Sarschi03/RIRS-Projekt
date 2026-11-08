import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="auth-form-heading">
        <h1>Ste pozabili geslo?</h1>
      </div>
      <form
        className="auth-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="reset-email">
          Službeni e-naslov
          <input
            id="reset-email"
            type="email"
            autoComplete="email"
            placeholder="ime@podjetje.si"
          />
        </label>
        <button type="submit" className="auth-submit">
          Ponastavi geslo
          <ArrowRight size={17} />
        </button>
      </form>
      <div className="auth-switch">
        <Link to="/login">
          Nazaj na prijavo
          <ArrowRight size={13} />
        </Link>
      </div>
    </>
  );
}
