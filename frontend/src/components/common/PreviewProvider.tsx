import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUpRight, Check, FileText, Upload, X } from "lucide-react";
import { PreviewContext } from "../../context/PreviewContext";
import type { PreviewAction, PreviewKind } from "../../types/preview";
import PreviewFields from "./PreviewFields";
import TaskDetails from "../tasks/TaskDetails";

const titles: Record<PreviewKind, string> = {
  task: "Dodaj nalogo",
  "daily-task": "Dodaj nalogo",
  project: "Ustvari projekt",
  "project-members": "Člani projekta in vloge",
  "manual-time": "Ročni vnos časa",
  employee: "Dodaj zaposlenega",
  assign: "Dodeli naloge",
  instructions: "Navodila za projekt",
  upload: "Naloži priloge",
  filter: "Filtri",
  week: "Izberi teden",
  "project-options": "Možnosti projekta",
  "column-options": "Možnosti stolpca",
  "task-details": "Podrobnosti naloge",
  "file-preview": "Predogled datoteke",
};

export default function PreviewProvider({ children }: { children: ReactNode }) {
  const [action, setAction] = useState<PreviewAction | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = useLocation().pathname;
  const [previousPath, setPreviousPath] = useState(pathname);
  if (previousPath !== pathname) {
    setPreviousPath(pathname);
    setAction(null);
  }
  const open = (next: PreviewAction | PreviewKind) => {
    setAction(typeof next === "string" ? { kind: next } : next);
  };
  useEffect(() => {
    const element = dialog.current;
    if (action && element && !element.open) element.showModal();
    if (!action && element?.open) element.close();
  }, [action]);

  return (
    <PreviewContext.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialog}
        className="ui-dialog workspace"
        aria-labelledby="preview-dialog-title"
        onCancel={() => setAction(null)}
        onClose={() => setAction(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              setAction(null);
          }
        }}
      >
        {action && (
          <div
            className="dialog-content"
            key={`${action.kind}-${action.task?.id || action.person?.email || action.project?.id || ""}`}
          >
            <header className="dialog-heading">
              <div>
                <h2 id="preview-dialog-title">
                  {action.title ||
                    (action.kind === "employee" && action.person
                      ? "Uredi zaposlenega"
                      : titles[action.kind])}
                </h2>
              </div>
              <button
                type="button"
                className="icon-button"
                aria-label="Zapri pogovorno okno"
                onClick={() => setAction(null)}
              >
                <X size={20} />
              </button>
            </header>
            {action.kind === "project-options" ||
            action.kind === "column-options" ? (
              <div className="dialog-options">
                <button
                  type="button"
                  onClick={() =>
                    open({
                      kind: "task",
                      project: action.project,
                      status: action.status,
                    })
                  }
                >
                  <span>Dodaj nalogo</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    open({ kind: "instructions", project: action.project })
                  }
                >
                  <span>Navodila za projekt</span>
                  <ArrowUpRight size={16} />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    open({ kind: "upload", project: action.project })
                  }
                >
                  <span>Naloži referenčne datoteke</span>
                  <Upload size={16} />
                </button>
              </div>
            ) : action.kind === "task-details" ? (
              <div className="dialog-task-details">
                <TaskDetails task={action.task} />
                <button
                  className="ui-button"
                  type="button"
                  onClick={() => open({ kind: "upload", task: action.task })}
                >
                  <Upload size={15} />
                  Naloži priloge
                </button>
              </div>
            ) : action.kind === "file-preview" ? (
              <div className="sample-file-preview">
                <FileText size={34} />
                <h3>{action.title}</h3>
                <p>Referenčna gradiva projekta</p>
                <p>Za izbrano datoteko ni shranjenega predogleda.</p>
              </div>
            ) : (
              <form
                className="preview-form"
                noValidate
                onSubmit={(event) => {
                  event.preventDefault();
                  setAction(null);
                }}
              >
                <div className="preview-form-fields">
                  <PreviewFields action={action} />
                </div>
                <footer className="dialog-footer">
                  <button
                    type="button"
                    className="ui-button"
                    onClick={() => setAction(null)}
                  >
                    Prekliči
                  </button>
                  <button type="submit" className="ui-button primary">
                    <Check size={15} />
                    Potrdi
                  </button>
                </footer>
              </form>
            )}
          </div>
        )}
      </dialog>
    </PreviewContext.Provider>
  );
}
