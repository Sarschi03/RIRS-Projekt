import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import DashboardPage from './pages/DashboardPage'
import KanbanPage from './pages/KanbanPage'
import StatisticsPage from './pages/StatisticsPage'
import MyDayPage from './pages/MyDayPage'
import ProjectsPage from './pages/ProjectsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/kanban" element={<KanbanPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/my-day" element={<MyDayPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
