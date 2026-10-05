import { useState } from "react";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail("");
    }, 800);
  };

  return (
    <section className="px-4 py-16 sm:px-8">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-gradient-to-r from-amber-500/15 via-slate-900 to-cyan-500/15 p-8 shadow-2xl backdrop-blur-xl sm:p-14">
        {/* Glow orb */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 mb-3">
              Weekly Digest
            </span>
            <h3 className="text-3xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-4xl md:text-5xl">
              Get one smart story in your inbox every weekend.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
              Curated essays on modern technology, craftsmanship, design systems,
              and productive living delivered right to your inbox.
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-slate-950/70 p-6 backdrop-blur-md shadow-xl">
            {subscribed ? (
              <div className="py-4 text-center">
                <span className="text-3xl">🎉</span>
                <p className="mt-2 text-base font-bold text-white">
                  You're on the list!
                </p>
                <p className="text-xs text-amber-300 mt-1">
                  Check your inbox this Saturday for your first issue.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs text-white placeholder:text-slate-400 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="whitespace-nowrap rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-md shadow-amber-400/20 transition hover:bg-amber-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Joining..." : "Subscribe"}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 pl-2">
                  🔒 Zero spam. Unsubscribe with one click at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
