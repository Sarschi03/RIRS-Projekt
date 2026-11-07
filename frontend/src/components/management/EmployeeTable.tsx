import { MoreHorizontal } from "lucide-react";
import { people } from "../../data/mockData";
import { Avatar, Badge } from "../common/UI";

export default function EmployeeTable({ users = false }: { users?: boolean }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Team member</th>
            <th>{users ? "Role" : "Projects"}</th>
            <th>{users ? "Projects" : "Assigned"}</th>
            <th>{users ? "Status" : "Completed"}</th>
            <th>{users ? "Actions" : "Hours recorded"}</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
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
                    aria-label={`Edit ${person.name}`}
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
    </div>
  );
}
