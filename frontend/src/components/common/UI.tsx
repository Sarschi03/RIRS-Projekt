import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePreview } from "../../context/PreviewContext";
import type { PreviewAction, PreviewKind } from "../../types/preview";
import { ArrowUpRight, Plus, Search, SlidersHorizontal } from "lucide-react";
import PageHero from "./PageHero";

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <PageHero title={title} description={description} action={action} />
  );
}

export function Button({
  children,
  primary = false,
  icon = false,
  action,
  to,
  onClick,
  ...props
}: {
  children: ReactNode;
  primary?: boolean;
  icon?: boolean;
  action?: PreviewAction | PreviewKind;
  to?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const preview = usePreview();
  const contents = (
    <>
      {icon && <Plus size={16} />}
      {children}
    </>
  );
  if (to)
    return (
      <Link className={`ui-button ${primary ? "primary" : ""}`} to={to}>
        {contents}
      </Link>
    );
  return (
    <button
      {...props}
      type="button"
      className={`ui-button ${primary ? "primary" : ""}`}
      onClick={(event) => {
        if (action) preview.open(action);
        onClick?.(event);
      }}
    >
      {contents}
    </button>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="badge">
      <span className="status-dot" />
      {children}
    </span>
  );
}

export function Avatar({
  initials,
  name,
}: {
  initials: string;
  name?: string;
}) {
  return (
    <span className="avatar" title={name} aria-label={name || initials}>
      {initials}
    </span>
  );
}

export function AvatarGroup({ members }: { members: string[] }) {
  return (
    <div className="avatar-group" aria-label="Člani projekta">
      {members.map((member) => (
        <Avatar key={member} initials={member} />
      ))}
    </div>
  );
}

export function Progress({
  value,
  label = "Napredek",
}: {
  value: number;
  label?: string;
}) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export function Panel({
  title,
  subtitle,
  action,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <strong>{value}</strong>
      <span className="stat-detail">{detail}</span>
    </article>
  );
}

export function FilterBar({
  placeholder = "Išči projekte …",
  children,
  query = "",
  onSearch,
  status = "Vsa stanja",
  onStatusChange,
  statuses = ["Načrtovanje", "V teku", "Zaključeno"],
}: {
  placeholder?: string;
  children?: ReactNode;
  query?: string;
  onSearch?: (query: string) => void;
  status?: string;
  onStatusChange?: (status: string) => void;
  statuses?: string[];
}) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <Search size={16} />
        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
          value={query}
          onChange={(event) => onSearch?.(event.target.value)}
        />
      </label>
      <div className="filter-actions">
        <Button action="filter">
          <SlidersHorizontal size={15} />
          Filtri
        </Button>
        <select
          className="ui-button"
          aria-label="Filtriraj po stanju"
          value={status}
          onChange={(event) => onStatusChange?.(event.target.value)}
        >
          <option>Vsa stanja</option>
          {statuses.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {children}
      </div>
    </div>
  );
}

export function TextArrow() {
  return <ArrowUpRight size={16} aria-hidden="true" />;
}
