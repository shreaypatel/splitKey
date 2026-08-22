import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { MobileGate } from "./components/MobileGate";
import { SiteNav } from "./components/SiteNav";
import { LessonPlayer } from "./pages/LessonPlayer";
import { Lessons } from "./pages/Lessons";

function AppShell() {
  const { pathname } = useLocation();
  const wide = pathname.startsWith("/lessons");

  return (
    <>
      <MobileGate />
      <div className="app-shell">
        <SiteNav />
        <main className={`app-main${wide ? " app-main--wide" : ""}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/lessons" replace />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/lessons/:id" element={<LessonPlayer />} />
            <Route path="/test" element={<Navigate to="/lessons" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
