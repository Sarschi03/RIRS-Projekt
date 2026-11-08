import type { PreviewAction } from "../../types/preview";
import { people, projects, tasks } from "../../data/mockData";
import UploadField from "./UploadField";
import ProjectMembersField from "../projects/ProjectMembersField";

function ProjectSelect({ value }: { value?: string }) {
  return (
    <label>
      Projekt
      <select name="project" defaultValue={value || projects[0].name}>
        {projects.map((project) => (
          <option key={project.id}>{project.name}</option>
        ))}
      </select>
    </label>
  );
}
function PersonSelect({ value }: { value?: string }) {
  return (
    <label>
      Dodeljeno
      <select name="assignee" defaultValue={value || people[0].name}>
        {people.map((person) => (
          <option key={person.email}>{person.name}</option>
        ))}
      </select>
    </label>
  );
}
function TaskSelect() {
  return (
    <label>
      Naloga
      <select name="task">
        {tasks.map((task) => (
          <option key={task.id}>{task.title}</option>
        ))}
      </select>
    </label>
  );
}

export default function PreviewFields({ action }: { action: PreviewAction }) {
  switch (action.kind) {
    case "daily-task":
      return (
        <>
          <label>
            Ime naloge
            <input name="name" placeholder="Kaj želite opraviti?" />
          </label>
          <label>
            Opis
            <textarea
              name="description"
              rows={4}
              placeholder="Dodajte kratek opis naloge …"
            />
          </label>
          <label>
            Projekt
            <select name="project" defaultValue="Neopredeljeno">
              <option>Neopredeljeno</option>
              {projects.map((project) => (
                <option key={project.id}>{project.name}</option>
              ))}
            </select>
          </label>
        </>
      );
    case "task":
      return (
        <>
          <label>
            Naslov naloge
            <input name="title" placeholder="Kaj je treba opraviti?" />
          </label>
          <label>
            Opis
            <textarea
              name="description"
              rows={3}
              placeholder="Dodajte nekaj pojasnil za ekipo …"
            />
          </label>
          <div className="form-grid">
            <ProjectSelect value={action.project?.name} />
            <PersonSelect />
          </div>
          <div className="form-grid">
            <label>
              Prioriteta
              <select name="priority" defaultValue="Srednja">
                <option>Nizka</option>
                <option>Srednja</option>
                <option>Visoka</option>
              </select>
            </label>
            <label>
              Rok
              <input name="deadline" type="date" />
            </label>
          </div>
          <label>
            Stanje
            <select name="status" defaultValue={action.status || "Za opraviti"}>
              <option>Za opraviti</option>
              <option>V teku</option>
              <option>Opravljeno</option>
            </select>
          </label>
          <label>
            Navodila za delo
            <textarea
              name="instructions"
              rows={3}
              placeholder="Referenčna gradiva, opombe za predajo ali naslednji koraki …"
            />
          </label>
          <UploadField />
        </>
      );
    case "project":
      return (
        <>
          <label>
            Ime projekta
            <input name="name" placeholder="Poimenujte svoj projekt" />
          </label>
          <label>
            Opis
            <textarea
              name="description"
              rows={3}
              placeholder="Kaj ustvarjate skupaj?"
            />
          </label>
          <div className="form-grid">
            <label>
              Datum začetka
              <input type="date" name="start" />
            </label>
            <label>
              Datum zaključka
              <input type="date" name="end" />
            </label>
          </div>
          <ProjectMembersField />
          <label>
            Stanje
            <select>
              <option>Načrtovanje</option>
              <option>V teku</option>
              <option>Zaključeno</option>
            </select>
          </label>
          <UploadField />
        </>
      );
    case "project-members":
      return <ProjectMembersField initialMembers={action.project?.members} />;
    case "manual-time":
      return (
        <>
          <ProjectSelect />
          <TaskSelect />
          <label>
            Datum
            <input type="date" name="date" />
          </label>
          <div className="form-grid">
            <label>
              Začetni čas
              <input type="time" name="start" />
            </label>
            <label>
              Končni čas
              <input type="time" name="end" />
            </label>
          </div>
          <label>
            Opombe
            <textarea name="notes" rows={3} placeholder="Kaj ste delali?" />
          </label>
        </>
      );
    case "employee":
      return (
        <>
          <label>
            Ime in priimek
            <input
              name="name"
              defaultValue={action.person?.name}
              placeholder="Ime in priimek zaposlenega"
            />
          </label>
          <label>
            Službeni e-naslov
            <input
              name="email"
              type="email"
              defaultValue={action.person?.email}
              placeholder="ime@podjetje.si"
            />
          </label>
          <label>
            Vloga
            <select
              name="role"
              defaultValue={action.person?.role || "Zaposleni"}
            >
              <option>Zaposleni</option>
              <option>Vodja projekta</option>
              <option>Vodja podjetja</option>
            </select>
          </label>
          <ProjectSelect />
          <label>
            Stanje računa
            <select
              name="status"
              defaultValue={action.person?.status || "Povabljen"}
            >
              <option>Aktiven</option>
              <option>Povabljen</option>
            </select>
          </label>
        </>
      );
    case "assign":
      return (
        <>
          <ProjectSelect />
          <TaskSelect />
          <PersonSelect />
          <label>
            Opombe za predajo
            <textarea rows={3} placeholder="Dodajte pojasnila za sodelavca …" />
          </label>
        </>
      );
    case "instructions":
      return (
        <>
          <ProjectSelect value={action.project?.name} />
          <label>
            Navodila za projekt
            <textarea
              name="instructions"
              rows={6}
              placeholder="Navedite smernice, pričakovanja in referenčna gradiva …"
            />
          </label>
          <UploadField />
        </>
      );
    case "upload":
      return (
        <>
          <p className="preview-intro">
            Priložite referenčna gradiva
            {action.task
              ? ` za ${action.task.title}`
              : action.project
                ? ` za ${action.project.name}`
                : " k svojemu delu"}
            .
          </p>
          <UploadField />
        </>
      );
    case "filter":
      return (
        <>
          <label>
            Stanje
            <select defaultValue="all">
              <option value="all">Vsa stanja</option>
              <option>Načrtovanje</option>
              <option>V teku</option>
              <option>Zaključeno</option>
              <option>Aktiven</option>
              <option>Povabljen</option>
            </select>
          </label>
          <PersonSelect />
          <label>
            Prioriteta
            <select>
              <option>Vse prioritete</option>
              <option>Visoka</option>
              <option>Srednja</option>
              <option>Nizka</option>
            </select>
          </label>
          <label>
            Rok pred
            <input type="date" />
          </label>
        </>
      );
    case "week":
      return (
        <>
          <label>
            Začetek tedna
            <input type="date" defaultValue="2026-11-02" />
          </label>
        </>
      );
    default:
      return null;
  }
}
