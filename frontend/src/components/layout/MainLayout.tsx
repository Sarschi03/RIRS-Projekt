import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import WorkspaceHeader from "./WorkspaceHeader";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <div className="navigation-slot">
        <Sidebar />
      </div>

      <main className="main-content">
        <div className="workspace">
          <WorkspaceHeader />
          <div className="workspace-page">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
