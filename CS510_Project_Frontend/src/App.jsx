import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050505] text-zinc-100">
      <div className="fixed inset-0 -z-20 bg-[#050505]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:100%_88px] opacity-60" />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
