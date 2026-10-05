import { useEffect, useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { getAllBlogs } from "../service/axios";

const CATEGORIES = [
  "All",
  "Technology",
  "Design",
  "Productivity",
  "Lifestyle",
  "Engineering",
  "Writing",
];

function BlogList() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayCount, setDisplayCount] = useState(6);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        setLoadError("");
        const blogs = await getAllBlogs();
        setPosts(Array.isArray(blogs) ? blogs : []);
      } catch (err) {
        setLoadError("Unable to load blogs from the backend right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category match
      const postCat = (post.category || "").toLowerCase();
      const matchesCategory =
        selectedCategory === "All" ||
        postCat === selectedCategory.toLowerCase() ||
        postCat.includes(selectedCategory.toLowerCase());

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const titleMatch = (post.title || "").toLowerCase().includes(query);
      const contentMatch = (post.content || "").toLowerCase().includes(query);
      const excerptMatch = (post.excerpt || "").toLowerCase().includes(query);
      const authorMatch = (
        post.author?.fullname ||
        post.author?.username ||
        ""
      )
        .toLowerCase()
        .includes(query);

      return (
        matchesCategory &&
        (titleMatch || contentMatch || excerptMatch || authorMatch)
      );
    });
  }, [posts, selectedCategory, searchQuery]);

  const displayedPosts = filteredPosts.slice(0, displayCount);
  const hasMorePosts = filteredPosts.length > displayCount;

  const handleViewMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  return (
    <section id="articles-section" className="px-4 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Title & Description */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300 mb-3">
              Curated Articles
            </span>
            <h2 className="text-3xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Latest from the publication
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-300">
            Explore diverse stories crafted with depth, research, and passion from
            our active creator community.
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="mb-10 space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by title, keyword, or author..."
                className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Results Count Badge */}
            <div className="text-xs text-slate-400 font-medium">
              Showing{" "}
              <span className="font-bold text-amber-300">
                {filteredPosts.length}
              </span>{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setDisplayCount(6);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 font-bold"
                    : "border border-white/10 bg-white/5 text-slate-300 hover:border-amber-300/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-3xl border border-white/10 bg-slate-900/60 p-6 space-y-4 shadow-xl"
              >
                <div className="h-48 w-full rounded-2xl bg-white/5" />
                <div className="h-4 w-1/3 rounded-full bg-white/10" />
                <div className="h-6 w-3/4 rounded-full bg-white/10" />
                <div className="h-4 w-full rounded-full bg-white/5" />
                <div className="h-4 w-5/6 rounded-full bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && loadError && (
          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-10 text-center backdrop-blur-md">
            <span className="text-3xl">⚠️</span>
            <p className="mt-3 text-base font-semibold text-red-300">{loadError}</p>
            <p className="mt-1 text-xs text-slate-400">
              Ensure your backend API is running on port 7000.
            </p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !loadError && filteredPosts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-white/15 bg-slate-900/40 p-12 text-center backdrop-blur-sm">
            <span className="text-4xl">📚</span>
            <h3 className="mt-4 text-xl font-bold text-white [font-family:'Playfair_Display',serif]">
              {searchQuery || selectedCategory !== "All"
                ? "No matching articles found"
                : "No articles published yet"}
            </h3>
            <p className="mt-2 text-sm text-slate-400 max-w-md mx-auto">
              {searchQuery || selectedCategory !== "All"
                ? "Try searching for a different keyword or select another category."
                : "Be the first creator to share your story with our readers."}
            </p>
            {(searchQuery || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-full bg-amber-400 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && !loadError && filteredPosts.length > 0 && (
          <>
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {displayedPosts.map((post) => (
                <BlogCard key={post._id || post.id} post={post} />
              ))}
            </div>

            {hasMorePosts && (
              <div className="mt-14 text-center">
                <button
                  onClick={handleViewMore}
                  className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-amber-400/20 transition hover:shadow-amber-400/30 hover:scale-105 active:scale-95"
                >
                  View More Articles ({filteredPosts.length - displayCount} left)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default BlogList;
