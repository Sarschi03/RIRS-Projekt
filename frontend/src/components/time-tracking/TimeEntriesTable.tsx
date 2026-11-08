import { timeEntries, projects, tasks } from "../../data/mockData";

export default function TimeEntriesTable() {
  return (
    <div className="table-scroll">
      <table>
        <caption className="sr-only">
          Časovni zapisi z vrstico za ročni vnos.
        </caption>
        <thead>
          <tr>
            <th>Datum</th>
            <th>Projekt / naloga</th>
            <th>Začetek</th>
            <th>Konec</th>
            <th>Trajanje</th>
          </tr>
        </thead>
        <tbody>
          <tr className="manual-entry-row">
            <td>
              <input type="date" aria-label="Datum ročnega vnosa" />
            </td>
            <td>
              <select aria-label="Projekt ročnega vnosa" defaultValue="">
                <option value="" disabled>
                  Izberite projekt
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <select aria-label="Naloga ročnega vnosa" defaultValue="">
                <option value="" disabled>
                  Izberite nalogo
                </option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.title}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input type="time" aria-label="Začetni čas ročnega vnosa" />
            </td>
            <td>
              <input type="time" aria-label="Končni čas ročnega vnosa" />
            </td>
            <td>
              <input
                type="text"
                placeholder="npr. 1 h 30 min"
                aria-label="Trajanje ročnega vnosa"
              />
              <span className="cell-secondary">Ročni vnos</span>
            </td>
          </tr>
          {timeEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>
                <strong>{entry.task}</strong>
                <span className="cell-secondary">{entry.project}</span>
              </td>
              <td>{entry.start}</td>
              <td>{entry.end}</td>
              <td className="tabular">{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
