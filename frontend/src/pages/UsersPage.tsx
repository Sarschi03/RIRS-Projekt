import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button, FilterBar, PageHeading, Panel } from "../components/common/UI";
import EmployeeTable from "../components/management/EmployeeTable";

export default function UsersPage() {
  return (
    <>
      <Link to="/management" className="back-link">
        <ChevronLeft size={14} />
        Team overview
      </Link>
      <PageHeading
        eyebrow="GOOD WORK STARTS WITH PEOPLE"
        title="Your team"
        description="The people bringing your projects to life."
        action={
          <Button primary icon>
            Add employee
          </Button>
        }
      />
      <div className="page-tabs">
        <span className="selected">
          All members <b>6</b>
        </span>
        <span>
          Active <b>5</b>
        </span>
        <span>
          Invited <b>1</b>
        </span>
      </div>
      <FilterBar placeholder="Search team members…" />
      <Panel title="Team members" subtitle="One team. Different perspectives.">
        <EmployeeTable users />
      </Panel>
      <p className="page-endnote">
        Roles and account controls are presentation placeholders.
      </p>
    </>
  );
}
