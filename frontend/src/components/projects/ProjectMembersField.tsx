import { useState } from "react";
import { people } from "../../data/mockData";
import { Avatar } from "../common/UI";

export default function ProjectMembersField({
  initialMembers = [],
}: {
  initialMembers?: string[];
}) {
  const [selected, setSelected] = useState<string[]>(initialMembers);
  return (
    <fieldset className="project-members-field">
      <legend>Člani projekta in vloge</legend>
      <p>
        Izberite enega ali več sodelavcev in določite njihovo vlogo pri
        projektu.
      </p>
      <div className="project-member-options">
        {people.map((person) => {
          const checked = selected.includes(person.initials);
          return (
            <div
              className={`project-member-option ${checked ? "is-selected" : ""}`}
              key={person.email}
            >
              <label className="member-checkbox">
                <input
                  type="checkbox"
                  name="members"
                  value={person.initials}
                  checked={checked}
                  onChange={(event) =>
                    setSelected((current) =>
                      event.target.checked
                        ? [...current, person.initials]
                        : current.filter(
                            (member) => member !== person.initials,
                          ),
                    )
                  }
                />
                <Avatar initials={person.initials} name={person.name} />
                <span>
                  <strong>{person.name}</strong>
                  <small>{person.email}</small>
                </span>
              </label>
              <label className="member-role">
                <span className="sr-only">
                  Vloga pri projektu za {person.name}
                </span>
                <select
                  name={`role-${person.initials}`}
                  aria-label={`Vloga pri projektu za ${person.name}`}
                  disabled={!checked}
                  defaultValue={
                    initialMembers[0] === person.initials
                      ? "Vodja projekta"
                      : "Sodelavec"
                  }
                >
                  <option>Vodja projekta</option>
                  <option>Sodelavec</option>
                  <option>Opazovalec</option>
                </select>
              </label>
            </div>
          );
        })}
      </div>
      <span className="member-selection-note">
        Izbrani člani: {selected.length}
      </span>
    </fieldset>
  );
}
