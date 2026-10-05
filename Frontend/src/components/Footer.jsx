import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-16 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-12 text-slate-300 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Col */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-black tracking-tight text-white [font-family:'Playfair_Display',serif] hover:opacity-90 transition inline-block"
          >
            Ink<span className="text-amber-400">Press</span>
          </Link>
          <p className="text-xs leading-relaxed text-slate-400 max-w-xs">
            Thoughtful writing on technology, modern design, productivity, and
            creative craftsmanship.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400">All systems operational</span>
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
            Explore
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link to="/blog" className="hover:text-amber-300 transition">
                All Articles
              </Link>
            </li>
            <li>
              <Link to="/blog/create" className="hover:text-amber-300 transition">
                Write a Story
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-amber-300 transition">
                Featured Highlights
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
            Publication
          </h5>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li>
              <Link to="/about" className="hover:text-amber-300 transition">
                About InkPress
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-amber-300 transition">
                Become a Writer
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-amber-300 transition">
                Member Sign In
              </Link>
            </li>
          </ul>
        </div>

        {/* Community & Connect */}
        <div>
          <h5 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
            Community
          </h5>
          <p className="text-xs text-slate-400 mb-3">
            Follow our publication updates and discussions on social platforms.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-xs text-slate-300 hover:border-amber-400/40 hover:text-amber-300 transition"
              title="GitHub"
            >
              💻 GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-xs text-slate-300 hover:border-amber-400/40 hover:text-amber-300 transition"
              title="Twitter"
            >
              🐦 Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 max-w-7xl">
        <p>© {new Date().getFullYear()} InkPress Publication. Built with passion & elegance.</p>
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-slate-300 transition">Privacy Policy</Link>
          <Link to="/" className="hover:text-slate-300 transition">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
