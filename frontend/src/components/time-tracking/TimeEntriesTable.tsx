import { timeEntries } from "../../data/mockData";

export default function TimeEntriesTable() {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Project / task</th>
            <th>Start</th>
            <th>End</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
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
