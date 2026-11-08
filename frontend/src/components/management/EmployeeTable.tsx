import { MoreHorizontal } from "lucide-react";
import { people } from "../../data/mockData";
import { Avatar, Badge } from "../common/UI";
import { usePreview } from "../../context/PreviewContext";
import type { Person } from "../../types/ui";

export default function EmployeeTable({
  users = false,
  members = people,
}: {
  users?: boolean;
  members?: Person[];
}) {
  const { open } = usePreview();
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Član ekipe</th>
            <th>{users ? "Vloga" : "Projekti"}</th>
            <th>{users ? "Projekti" : "Dodeljeno"}</th>
            <th>{users ? "Stanje" : "Zaključeno"}</th>
            <th>{users ? "Dejanja" : "Zabeležene ure"}</th>
          </tr>
        </thead>
        <tbody>
          {members.map((person) => (
            <tr key={person.email}>
              <td>
                <div className="person-cell">
                  <Avatar initials={person.initials} name={person.name} />
                  <div>
                    <strong>{person.name}</strong>
                    <span className="cell-secondary">
                      {users ? person.email : person.role}
                    </span>
                  </div>
                </div>
              </td>
              <td>{users ? person.role : person.projects}</td>
              <td>{users ? person.projects : person.assigned}</td>
              <td>
                {users ? <Badge>{person.status}</Badge> : person.completed}
              </td>
              <td>
                {users ? (
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Uredi ${person.name}`}
                    onClick={() => open({ kind: "employee", person })}
                  >
                    <MoreHorizontal size={18} />
                  </button>
                ) : (
                  person.hours
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {members.length === 0 && (
        <p className="empty-preview">
          Noben član ekipe ne ustreza izbranemu pogledu.
        </p>
      )}
    </div>
  );
}
