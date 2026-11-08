import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button, FilterBar, PageHeading, Panel } from "../components/common/UI";
import PageTabs from "../components/common/PageTabs";
import EmployeeTable from "../components/management/EmployeeTable";
import { people } from "../data/mockData";

export default function UsersPage() {
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Vsa stanja");
  const visible = people.filter(
    (person) =>
      (tab === "all" ||
        person.status === (tab === "active" ? "Aktiven" : "Povabljen")) &&
      (status === "Vsa stanja" || person.status === status) &&
      `${person.name} ${person.email}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <Link to="/management" className="back-link">
        <ChevronLeft size={14} />
        Pregled ekipe
      </Link>
      <PageHeading
        title="Vaša ekipa"
        description="Sodelavci, s katerimi uresničujete svoje projekte."
        action={
          <Button primary icon action="employee">
            Dodaj zaposlenega
          </Button>
        }
      />
      <PageTabs
        label="Pogledi ekipe"
        value={tab}
        onChange={setTab}
        options={[
          { value: "all", label: "Vsi člani", count: 6 },
          { value: "active", label: "Aktivni", count: 5 },
          { value: "invited", label: "Povabljeni", count: 1 },
        ]}
      />
      <FilterBar
        placeholder="Išči člane ekipe …"
        query={query}
        onSearch={setQuery}
        status={status}
        onStatusChange={setStatus}
        statuses={["Aktiven", "Povabljen"]}
      />
      <Panel title="Člani ekipe" subtitle="Ena ekipa. Različni pogledi.">
        <EmployeeTable users members={visible} />
      </Panel>
    </>
  );
}
