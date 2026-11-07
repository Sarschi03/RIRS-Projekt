import { ArrowRight, Workflow } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthForm({ signup = false }: { signup?: boolean }) {
  return (
    <>
      <span className="auth-form-logo">
        <Workflow size={25} />
      </span>
      <div className="auth-form-heading">
        <span className="eyebrow">
          {signup ? "A FRESH START" : "YOUR WORK, IN ONE PLACE"}
        </span>
        <h1>{signup ? "Make room for good work." : "Welcome back."}</h1>
        <p>
          {signup
            ? "Create your account. Find a little more focus."
            : "A new day. A clearer view. Let’s get you settled in."}
        </p>
      </div>
      <form
        className="auth-form"
        noValidate
        onSubmit={(event) => event.preventDefault()}
      >
        {signup && (
          <label htmlFor="full-name">
            Full name
            <input
              id="full-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
            />
          </label>
        )}
        <label htmlFor="email">
          Work email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={signup ? "new-password" : "current-password"}
            placeholder={signup ? "Create a password" : "Enter your password"}
          />
        </label>
        {!signup && (
          <div className="auth-form-options">
            <label className="remember-label">
              <input type="checkbox" />
              Remember me
            </label>
            <button type="button" className="plain-button">
              Forgot password?
            </button>
          </div>
        )}
        {signup && (
          <p className="auth-consent">
            A shared space for a more organized workday.
            <br />
            Your work. Your people. A little more clarity.
          </p>
        )}
        <button type="button" className="auth-submit">
          {signup ? "Create account" : "Log in"}
          <ArrowRight size={17} />
        </button>
      </form>
      <div className="auth-switch">
        <span>{signup ? "Already part of the team?" : "New to workIT?"}</span>
        <Link to={signup ? "/login" : "/signup"}>
          {signup ? "Log in" : "Create an account"}
          <ArrowRight size={13} />
        </Link>
      </div>
      <p className="auth-preview-note">
        Design preview — account actions are not connected.
      </p>
    </>
  );
}
