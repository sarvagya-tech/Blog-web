import { useNavigate } from "react-router-dom";

const getEstimatedReadTime = (content = "") => {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

function BlogCard({ post }) {
  const navigate = useNavigate();
  const blogId = post._id || post.id;
  const imageSource = post.media || post.image;
  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : post.date || "Recent";
  const excerpt =
    post.excerpt ||
    (post.content
      ? `${post.content.slice(0, 120)}${post.content.length > 120 ? "..." : ""}`
      : "Open this story to read the full post.");
  const authorName =
    post.author?.username || post.author?.fullname || post.author || "Anonymous";
  const readTime = post.readTime || getEstimatedReadTime(post.content);

  const handleNavigate = () => {
    if (!blogId) return;
    navigate(`/blog/${blogId}`);
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-amber-300/30">
      <div className="relative h-56 overflow-hidden bg-slate-900">
        {imageSource ? (
          <img
            src={imageSource}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-amber-600/20 via-slate-900 to-cyan-900/30">
            <span className="text-4xl opacity-50">✍️</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-900">
          {post.category || "Blog"}
        </span>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
          {publishedDate} | {readTime}
        </p>
        <h3 className="text-2xl font-bold leading-tight text-white [font-family:'Playfair_Display',serif]">
          {post.title}
        </h3>
        <p className="text-sm leading-7 text-slate-300">{excerpt}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-sm font-semibold text-slate-100">
            {authorName}
          </span>
          <button
            onClick={handleNavigate}
            className="rounded-full border border-amber-300/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-amber-100 transition hover:bg-amber-400 hover:text-slate-950"
          >
            Read
          </button>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
