import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../service/Authcontext';

function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-white [font-family:'Playfair_Display',serif] hover:opacity-90 transition"
        >
          Ink<span className="text-amber-400">Press</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
          <li>
            <Link
              to="/"
              className={`transition hover:text-amber-300 ${
                isActive('/') ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`transition hover:text-amber-300 ${
                isActive('/blog') ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              Articles
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`transition hover:text-amber-300 ${
                isActive('/about') ? 'text-amber-400 font-semibold' : ''
              }`}
            >
              About
            </Link>
          </li>
        </ul>

        {/* Desktop Auth / Action Area */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/blog/create"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md shadow-amber-400/20 transition hover:shadow-amber-400/30 hover:scale-105"
              >
                <span>✍️</span>
                <span>Write Story</span>
              </Link>

              <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.fullname || user?.username}
                    className="h-9 w-9 rounded-full object-cover border border-amber-400/40"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xs font-bold text-slate-950">
                    {(user?.fullname || user?.username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left leading-tight">
                  <p className="text-xs font-semibold text-white max-w-[120px] truncate">
                    {user?.fullname || user?.username}
                  </p>
                  <p className="text-[10px] text-amber-300/80">Writer</p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  title="Log out"
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-200 transition hover:border-amber-300/50 hover:text-amber-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300 hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {isAuthenticated && (
            <Link
              to="/blog/create"
              className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950"
            >
              ✍️ Write
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-slate-900/80 text-slate-200 transition hover:border-amber-300/50 hover:text-amber-200"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-3 border-t border-white/10 bg-slate-950/95 px-5 pb-6 pt-4 text-sm text-slate-200">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-3 py-2 transition ${
              isActive('/') ? 'bg-amber-400/10 text-amber-300 font-semibold' : 'hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          <Link
            to="/blog"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-3 py-2 transition ${
              isActive('/blog') ? 'bg-amber-400/10 text-amber-300 font-semibold' : 'hover:bg-white/5'
            }`}
          >
            Articles
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`block rounded-xl px-3 py-2 transition ${
              isActive('/about') ? 'bg-amber-400/10 text-amber-300 font-semibold' : 'hover:bg-white/5'
            }`}
          >
            About
          </Link>

          {isAuthenticated ? (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user?.fullname || user?.username}
                    className="h-10 w-10 rounded-full object-cover border border-amber-400/40"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 font-bold text-slate-950">
                    {(user?.fullname || user?.username || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">
                    {user?.fullname || user?.username}
                  </p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
              </div>

              <Link
                to="/blog/create"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 py-2.5 text-center font-bold text-slate-950 text-xs uppercase tracking-wider"
              >
                ✍️ Write Story
              </Link>

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                }}
                className="w-full rounded-full border border-red-400/30 bg-red-500/10 py-2 text-center text-xs font-semibold text-red-300"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-white/10 space-y-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-full border border-white/15 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-slate-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block w-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-950"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
