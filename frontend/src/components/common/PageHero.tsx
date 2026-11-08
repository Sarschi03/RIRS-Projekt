import type { ReactNode } from "react";
import gradient from "../../assets/dashboard-gradient.png";

export default function PageHero({ title, description, action, meta }: {
  title: string;
  description?: string;
  action?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <img src={gradient} alt="" className="page-hero-image" />
      <div className="page-hero-content">
        {meta && <div className="page-hero-meta">{meta}</div>}
        <div className="page-hero-row">
          <div className="page-hero-copy">
            <h1>{title}</h1>
            {description && <p>{description}</p>}
          </div>
          {action && <div className="page-hero-actions">{action}</div>}
        </div>
      </div>
    </header>
  );
}
