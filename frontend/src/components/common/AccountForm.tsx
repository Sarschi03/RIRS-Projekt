import type { ReactNode } from "react";

export default function AccountForm({
  children,
  label = "Shrani spremembe",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <form
      className="account-form"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {children}
      <footer className="account-form-footer">
        <button className="ui-button primary" type="submit">
          {label}
        </button>
      </footer>
    </form>
  );
}
