import type { ReactNode } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <header className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}

export function Button({
  children,
  primary = false,
  icon = false,
}: {
  children: ReactNode;
  primary?: boolean;
  icon?: boolean;
}) {
  return (
    <button type="button" className={`ui-button ${primary ? "primary" : ""}`}>
      {icon && <Plus size={16} />}
      {children}
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
    <div className="avatar-group" aria-label="Project members">
      {members.map((member) => (
        <Avatar key={member} initials={member} />
      ))}
    </div>
  );
}

export function Progress({
  value,
  label = "Progress",
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
  placeholder = "Search projects…",
  children,
}: {
  placeholder?: string;
  children?: ReactNode;
}) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <Search size={16} />
        <input
          type="search"
          placeholder={placeholder}
          aria-label={placeholder}
        />
      </label>
      <div className="filter-actions">
        <Button>
          <SlidersHorizontal size={15} />
          Filter
        </Button>
        <Button>
          All statuses
          <ChevronDown size={14} />
        </Button>
        {children}
      </div>
    </div>
  );
}

export function TextArrow() {
  return <ArrowUpRight size={16} aria-hidden="true" />;
}
