import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppData } from "../../context/DataContext";

export default function ProfileProjects() {
  const { data } = useAppData();
  return (
    <section
      className="profile-projects profile-block"
      aria-labelledby="profile-projects-title"
    >
      <header className="profile-block-heading">
        <h2 id="profile-projects-title">Vaši projekti</h2>
        <p>Projekti, pri katerih sodelujete</p>
      </header>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Projekt</th>
              <th>Vloga</th>
              <th>
                <span className="sr-only">Odpri projekt</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.projects.slice(0, 2).map((project) => (
              <tr key={project.id}>
                <td>
                  <Link to={`/projects/${project.id}`}>{project.name}</Link>
                </td>
                <td>
                  <span className="profile-role">Sodelavec</span>
                </td>
                <td>
                  <Link
                    to={`/projects/${project.id}`}
                    className="profile-project-link"
                    aria-label={`Odpri projekt ${project.name}`}
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
