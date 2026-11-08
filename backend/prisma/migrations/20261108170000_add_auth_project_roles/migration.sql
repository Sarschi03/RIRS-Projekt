-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "users"
ADD COLUMN "jobTitle" TEXT,
ADD COLUMN "profileImage" TEXT;

-- Projects are assigned to the seeded project manager before this column
-- becomes required.
ALTER TABLE "projects"
ADD COLUMN "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNING',
ADD COLUMN "managerId" INTEGER;

UPDATE "projects"
SET "managerId" = (
  SELECT "id" FROM "users"
  WHERE "role" IN ('PROJECT_MANAGER', 'COMPANY_MANAGER')
  ORDER BY CASE WHEN "role" = 'PROJECT_MANAGER' THEN 0 ELSE 1 END, "id"
  LIMIT 1
);

DELETE FROM "daily_todos";
DELETE FROM "time_entries";
DELETE FROM "project_instructions";
DELETE FROM "tasks";
DELETE FROM "project_members";
DELETE FROM "projects" WHERE "managerId" IS NULL;

ALTER TABLE "projects" ALTER COLUMN "managerId" SET NOT NULL;

ALTER TABLE "daily_todos"
ADD COLUMN "description" TEXT,
ADD COLUMN "projectId" INTEGER;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_managerId_fkey"
FOREIGN KEY ("managerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_todos" ADD CONSTRAINT "daily_todos_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "projects_managerId_idx" ON "projects"("managerId");
CREATE INDEX "tasks_projectId_idx" ON "tasks"("projectId");
CREATE INDEX "daily_todos_userId_date_idx" ON "daily_todos"("userId", "date");
