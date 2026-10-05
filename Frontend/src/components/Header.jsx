import { useNavigate } from "react-router-dom";
import { useAuth } from "../service/Authcontext";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleExplore = () => {
    const blogSection = document.getElementById("articles-section");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/blog");
    }
  };

  const handleStart = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/blog/create");
    }
  };

  return (
    <header className="relative overflow-hidden px-4 pb-16 pt-16 sm:px-8 sm:pt-24">
      {/* Background ambient orbs */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-6 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Headline & CTAs */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 backdrop-blur-md mb-6 shadow-sm shadow-amber-400/10">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            Modern Storytelling & Publishing
          </div>

          <h1 className="text-4xl font-black leading-[1.12] text-white [font-family:'Playfair_Display',serif] sm:text-6xl lg:text-6xl">
            Stories that sharpen your craft &{" "}
            <span className="text-gradient-gold italic">ignite ideas.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            A curated editorial publication covering technology, design systems,
            engineering insights, and creative living. Written by thinkers, built
            for curious minds.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-amber-400/25 transition hover:shadow-amber-400/40 hover:scale-105 active:scale-95"
            >
              <span>✨</span>
              <span>{user ? "Create New Blog" : "Start Writing Today"}</span>
            </button>
            <button
              onClick={handleExplore}
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-amber-300/40 hover:bg-white/10 hover:text-amber-100"
            >
              Explore Articles ↓
            </button>
          </div>


        </div>

        {/* Right Column: Hero Visual Card */}
        <div className="relative lg:col-span-5">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-amber-400/20 via-orange-500/10 to-cyan-400/20 blur-2xl" />

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-3 shadow-2xl backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
                alt="Workspace with laptop, notes and aesthetic plant"
                className="h-[400px] w-full object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Floating Tag */}
              <span className="absolute left-4 top-4 rounded-full bg-slate-950/80 border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300 backdrop-blur-md">
                Featured Story
              </span>

              {/* Card Footer Details */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Design & Architecture
                </p>
                <p className="mt-1 text-sm font-bold text-white [font-family:'Playfair_Display',serif]">
                  How Minimalism Sharpens Digital Products
                </p>
                <p className="mt-1 text-xs text-slate-400">By Editor's Pick • 5 min read</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
