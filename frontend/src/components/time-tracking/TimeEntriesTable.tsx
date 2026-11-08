import { useState } from "react";
import { Plus } from "lucide-react";
import { useAppData } from "../../context/DataContext";

export default function TimeEntriesTable() {
  const { data } = useAppData();
  const { timeEntries, projects } = data;
  const [showManualEntry, setShowManualEntry] = useState(false);
  return (
    <>
      <div className="time-table-toolbar">
        <button
          type="button"
          className="time-entry-add"
          aria-label="Dodaj ročni časovni zapis"
          title="Dodaj ročni časovni zapis"
          aria-expanded={showManualEntry}
          disabled={showManualEntry}
          onClick={() => setShowManualEntry(true)}
        >
          <Plus size={17} />
        </button>
      </div>
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
          {showManualEntry && <tr className="manual-entry-row">
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
          </tr>}
          {timeEntries.map((entry) => (
            <tr key={entry.id}>
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
    </>
  );
}
