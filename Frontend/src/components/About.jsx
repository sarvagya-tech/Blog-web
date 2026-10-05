function About() {
  return (
    <section className="bg-slate-950 text-white px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              About InkPress
            </span>
            <h2 className="mt-6 text-3xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              A publishing home for curious writers & thoughtful readers.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              InkPress was created to bring clarity and depth to digital reading.
              We blend editorial craftsmanship with modern technology, giving
              creators an inspiring space to write, publish, and connect with
              readers across the globe.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
                <p className="text-xl font-bold text-amber-400">Focused Reading</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Clean editorial typography designed for high focus and deep comprehension.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
                <p className="text-xl font-bold text-amber-400">Creator First</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Effortless story publishing, instant media attachments, and interactive comments.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white [font-family:'Playfair_Display',serif] mb-6 border-b border-white/10 pb-4">
              Core Principles
            </h3>

            <div className="space-y-4">
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🎯</span>
                  <h4 className="text-sm font-bold text-amber-200">Quality over Noise</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Every story is formatted for maximum readability, devoid of intrusive ads or cluttered layouts.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">✍️</span>
                  <h4 className="text-sm font-bold text-white">Community Engagement</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Connect through real-time discussions, likes, and genuine reader conversations.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">⚡</span>
                  <h4 className="text-sm font-bold text-white">Fast & Responsive</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  Built on modern React and Node.js for instant search, smooth interactions, and quick publishing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
