import { PageHeading, Button } from "../components/common/UI";
import KanbanBoard from "../components/tasks/KanbanBoard";
export default function KanbanPage() {
  return (
    <>
      <PageHeading
        title="Tabla Kanban"
        description="Od prve zamisli do zadnje podrobnosti."
        action={
          <Button primary icon action="task">
            Dodaj nalogo
          </Button>
        }
      />
      <KanbanBoard />
    </>
  );
}
