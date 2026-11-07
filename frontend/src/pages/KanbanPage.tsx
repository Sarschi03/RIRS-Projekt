import { PageHeading, Button } from "../components/common/UI";
import KanbanBoard from "../components/tasks/KanbanBoard";
export default function KanbanPage() {
  return (
    <>
      <PageHeading
        eyebrow="WEBSITE REDESIGN"
        title="Task board"
        description="From the first idea to the final detail."
        action={
          <Button primary icon>
            Add task
          </Button>
        }
      />
      <KanbanBoard />
    </>
  );
}
