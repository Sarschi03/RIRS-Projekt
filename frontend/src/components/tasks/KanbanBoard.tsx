import { useRef, useState } from "react";
import type { DragEvent, KeyboardEvent, PointerEvent } from "react";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  Flag,
  GripVertical,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Upload,
} from "lucide-react";
import { tasks } from "../../data/mockData";
import type { Project, Task } from "../../types/ui";
import { Avatar } from "../common/UI";
import { usePreview } from "../../context/PreviewContext";

type Status = Task["status"];
type DragItem = { kind: "task"; id: string } | { kind: "column"; id: Status };
const initialColumns: Status[] = ["Za opraviti", "V teku", "Opravljeno"];

function hasTaskCover(taskId: string) {
  const number = Number(taskId.split("-").at(-1));
  return Number.isFinite(number) && number % 3 === 0;
}

export default function KanbanBoard({
  items = tasks,
  project,
}: {
  items?: Task[];
  project?: Project;
}) {
  // Transient layout state only. Source fixtures are never mutated or saved.
  const [cards, setCards] = useState<Task[]>(() =>
    items.map((item) => ({ ...item })),
  );
  const [columns, setColumns] = useState<Status[]>(initialColumns);
  const [drag, setDrag] = useState<DragItem | null>(null);
  const [hover, setHover] = useState<Status | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const pointerOrigin = useRef<{ x: number; y: number } | null>(null);
  const { open } = usePreview();

  function moveTask(
    id: string,
    status: Status,
    before?: string,
    after = false,
  ) {
    setCards((current) => {
      const original = current.find((card) => card.id === id);
      if (!original || before === id) return current;
      const next = current.filter((card) => card.id !== id);
      const target = before ? next.findIndex((card) => card.id === before) : -1;
      next.splice(target < 0 ? next.length : target + (after ? 1 : 0), 0, {
        ...original,
        status,
      });
      return next;
    });
    setAnnouncement(`${id} je premaknjena v stolpec ${status}.`);
  }
  function moveColumn(id: Status, target: Status) {
    if (id === target) return;
    setColumns((current) => {
      const next = current.filter((column) => column !== id);
      next.splice(current.indexOf(target), 0, id);
      return next;
    });
    setAnnouncement(`${id} – stolpec je premaknjen.`);
  }
  function targetAt(element: Element | null, moving: DragItem, y: number) {
    const column = element?.closest<HTMLElement>("[data-column]");
    if (!column || !board.current?.contains(column)) return;
    const status = column.dataset.column as Status;
    if (moving.kind === "column") {
      moveColumn(moving.id, status);
      return;
    }
    const card = element?.closest<HTMLElement>("[data-task-id]");
    const rect = card?.getBoundingClientRect();
    moveTask(
      moving.id,
      status,
      card?.dataset.taskId,
      !!rect && y > rect.top + rect.height / 2,
    );
  }
  function beginPointer(
    event: PointerEvent<HTMLButtonElement>,
    moving: DragItem,
  ) {
    if (event.button !== 0) return;
    event.preventDefault();
    pointerOrigin.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag(moving);
  }
  function trackPointer(event: PointerEvent<HTMLButtonElement>) {
    if (!drag) return;
    const column = document
      .elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>("[data-column]");
    setHover(
      board.current?.contains(column || null)
        ? (column?.dataset.column as Status)
        : null,
    );
  }
  function endPointer(event: PointerEvent<HTMLButtonElement>) {
    const origin = pointerOrigin.current;
    if (
      drag &&
      origin &&
      Math.hypot(event.clientX - origin.x, event.clientY - origin.y) > 5
    ) {
      targetAt(
        document.elementFromPoint(event.clientX, event.clientY),
        drag,
        event.clientY,
      );
    }
    pointerOrigin.current = null;
    setDrag(null);
    setHover(null);
  }
  function beginNative(event: DragEvent, moving: DragItem) {
    setDrag(moving);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "application/x-workit-preview",
      JSON.stringify(moving),
    );
  }
  function dropNative(event: DragEvent) {
    event.preventDefault();
    if (drag) targetAt(event.target as Element, drag, event.clientY);
    setDrag(null);
    setHover(null);
  }
  function taskKeyboard(event: KeyboardEvent, task: Task) {
    if (event.key === "Escape") {
      setDrag(null);
      setHover(null);
      return;
    }
    if (
      !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)
    )
      return;
    event.preventDefault();
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const index =
        columns.indexOf(task.status) + (event.key === "ArrowRight" ? 1 : -1);
      if (columns[index]) moveTask(task.id, columns[index]);
    } else {
      const siblings = cards.filter((card) => card.status === task.status);
      const index =
        siblings.findIndex((card) => card.id === task.id) +
        (event.key === "ArrowDown" ? 1 : -1);
      if (siblings[index])
        moveTask(
          task.id,
          task.status,
          siblings[index].id,
          event.key === "ArrowDown",
        );
    }
  }

  return (
    <>
      <p className="board-preview-help" id="board-drag-help">
        Kartice povlecite med stolpci ali uporabite meni za premik. Za spremembo
        vrstnega reda stolpcev povlecite njihove ročice.
      </p>
      <span className="sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
      <div className="kanban-board" ref={board}>
        {columns.map((status) => (
          <section
            className={`kanban-column ${hover === status && drag ? "drop-target" : ""}`}
            key={status}
            data-column={status}
            onDragOver={(event) => {
              if (drag) {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
                setHover(status);
              }
            }}
            onDrop={dropNative}
          >
            <header>
              <div>
                <button
                  className="icon-button drag-handle column-drag-handle"
                  type="button"
                  draggable
                  onDragStart={(event) =>
                    beginNative(event, { kind: "column", id: status })
                  }
                  onDragEnd={() => {
                    setDrag(null);
                    setHover(null);
                  }}
                  onPointerDown={(event) =>
                    beginPointer(event, { kind: "column", id: status })
                  }
                  onPointerMove={trackPointer}
                  onPointerUp={endPointer}
                  onPointerCancel={() => {
                    setDrag(null);
                    setHover(null);
                  }}
                  aria-label={`Premakni stolpec ${status}`}
                  title="Povlecite za spremembo vrstnega reda. Uporabite lahko tudi levo in desno puščico."
                  onKeyDown={(event) => {
                    if (
                      event.key === "ArrowLeft" ||
                      event.key === "ArrowRight"
                    ) {
                      event.preventDefault();
                      const target =
                        columns[
                          columns.indexOf(status) +
                            (event.key === "ArrowRight" ? 1 : -1)
                        ];
                      if (target) moveColumn(status, target);
                    }
                  }}
                >
                  <GripVertical size={14} />
                </button>
                <span
                  className={`column-dot ${status === "Opravljeno" ? "filled" : ""}`}
                />
                <h2>{status}</h2>
                <span className="count">
                  {cards.filter((task) => task.status === status).length}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`${status} – možnosti`}
                  onClick={() =>
                    open({
                      kind: "column-options",
                      status,
                      project,
                      title: `${status} – možnosti`,
                    })
                  }
                >
                  <MoreHorizontal size={16} />
                </button>
                <button
                  type="button"
                  className="icon-button"
                  aria-label={`Dodaj nalogo v stolpec ${status}`}
                  onClick={() => open({ kind: "task", status, project })}
                >
                  <Plus size={16} />
                </button>
              </div>
            </header>
            <div className="kanban-cards">
              {cards
                .filter((task) => task.status === status)
                .map((task) => (
                  <article
                    className={`task-card ${drag?.kind === "task" && drag.id === task.id ? "is-dragging" : ""}`}
                    key={task.id}
                    data-task-id={task.id}
                    draggable
                    onDragStart={(event) =>
                      beginNative(event, { kind: "task", id: task.id })
                    }
                    onDragEnd={() => {
                      setDrag(null);
                      setHover(null);
                    }}
                  >
                    {hasTaskCover(task.id) && (
                      <div className="task-card-cover" aria-hidden="true" />
                    )}
                    <div className="task-card-id">
                      <div className="task-id-with-handle">
                        <button
                          className="icon-button drag-handle"
                          type="button"
                          aria-label={`Premakni ${task.title}`}
                          aria-describedby="board-drag-help"
                          title="Povlecite za premik. S puščicami premikate kartice med stolpci in spreminjate vrstni red."
                          onPointerDown={(event) =>
                            beginPointer(event, { kind: "task", id: task.id })
                          }
                          onPointerMove={trackPointer}
                          onPointerUp={endPointer}
                          onPointerCancel={() => {
                            setDrag(null);
                            setHover(null);
                          }}
                          onKeyDown={(event) => taskKeyboard(event, task)}
                        >
                          <GripVertical size={13} />
                        </button>
                        <span>{task.id}</span>
                      </div>
                      <span className="task-priority">
                        <Flag size={11} />
                        {task.priority}
                      </span>
                    </div>
                    <h3>
                      <button
                        type="button"
                        className="task-title-button"
                        onClick={() => open({ kind: "task-details", task })}
                      >
                        {task.title}
                      </button>
                    </h3>
                    <p>{task.description}</p>
                    <footer>
                      <span>
                        <CalendarDays size={13} />
                        {task.deadline}
                      </span>
                      <button
                        type="button"
                        className="task-meta-button"
                        aria-label={`Prikaži podrobnosti za ${task.title}`}
                        onClick={() => open({ kind: "task-details", task })}
                      >
                        <MessageCircle size={13} />
                        {task.comments}
                      </button>
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Naloži prilogo za ${task.title}`}
                        onClick={() => open({ kind: "upload", task, project })}
                      >
                        <Upload size={13} />
                      </button>
                      <Avatar initials={task.assignee} name={task.name} />
                    </footer>
                    <details className="task-move-menu">
                      <summary>Premakni kartico</summary>
                      <div>
                        <label>
                          Stolpec
                          <select
                            aria-label={`Stolpec naloge ${task.title}`}
                            value={task.status}
                            onChange={(event) =>
                              moveTask(task.id, event.target.value as Status)
                            }
                          >
                            {columns.map((column) => (
                              <option key={column}>{column}</option>
                            ))}
                          </select>
                        </label>
                        <button
                          type="button"
                          className="icon-button"
                          aria-label={`Premakni ${task.title} navzgor`}
                          onClick={() => {
                            const siblings = cards.filter(
                              (card) => card.status === status,
                            );
                            const previous =
                              siblings[
                                siblings.findIndex(
                                  (card) => card.id === task.id,
                                ) - 1
                              ];
                            if (previous)
                              moveTask(task.id, status, previous.id);
                          }}
                          disabled={
                            cards.filter((card) => card.status === status)[0]
                              ?.id === task.id
                          }
                        >
                          <ArrowUp size={15} />
                        </button>
                        <button
                          type="button"
                          className="icon-button"
                          aria-label={`Premakni ${task.title} navzdol`}
                          onClick={() => {
                            const siblings = cards.filter(
                              (card) => card.status === status,
                            );
                            const next =
                              siblings[
                                siblings.findIndex(
                                  (card) => card.id === task.id,
                                ) + 1
                              ];
                            if (next) moveTask(task.id, status, next.id, true);
                          }}
                          disabled={
                            cards
                              .filter((card) => card.status === status)
                              .at(-1)?.id === task.id
                          }
                        >
                          <ArrowDown size={15} />
                        </button>
                      </div>
                    </details>
                  </article>
                ))}
            </div>
            <button
              type="button"
              className="add-card"
              onClick={() => open({ kind: "task", status, project })}
            >
              <Plus size={15} />
              Dodaj nalogo
            </button>
          </section>
        ))}
      </div>
    </>
  );
}
