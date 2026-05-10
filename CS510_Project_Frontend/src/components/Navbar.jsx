import { Link, NavLink } from "react-router-dom";
import { BadgeCheck, Code2, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-black">
            <BadgeCheck size={22} />
          </span>
          <span>
            <span className="block text-lg font-black tracking-tight">AdCheck</span>
            <span className="hidden text-xs text-zinc-500 sm:block">Product Trustworthiness Analyzer</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-400 md:flex">
          <Search size={16} className="text-zinc-300" />
          evidence-first product checks
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? "bg-white text-black" : "text-zinc-300 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-white/40 hover:text-white sm:flex"
            aria-label="Vite documentation"
          >
            <Code2 size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}
