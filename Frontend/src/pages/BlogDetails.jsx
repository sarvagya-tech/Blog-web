import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  getAllBlogs,
  getBlogById,
  getBlogLikes,
  toggleBlogLike,
  getBlogComments,
  createComment,
  deleteComment,
} from "../service/axios";
import { useAuth } from "../service/Authcontext";

const getEstimatedReadTime = (content = "") => {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Like state
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [authPrompt, setAuthPrompt] = useState("");

  // Comments state
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");
  const [deletingCommentId, setDeletingCommentId] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [blog, blogs, likesData, commentsData] = await Promise.all([
          getBlogById(id),
          getAllBlogs().catch(() => []),
          getBlogLikes(id).catch(() => ({ likesCount: 0, isLiked: false })),
          getBlogComments(id).catch(() => []),
        ]);

        setPost(blog);
        setLikesCount(likesData.likesCount || 0);
        setIsLiked(Boolean(likesData.isLiked));
        setComments(Array.isArray(commentsData) ? commentsData : []);

        setRelatedPosts(
          (Array.isArray(blogs) ? blogs : []).filter(
            (item) => item?._id !== blog?._id
          )
        );
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch the blog.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id]);

  const handleLikeToggle = async () => {
    if (!isAuthenticated) {
      setAuthPrompt("Please log in to like this blog post.");
      setTimeout(() => setAuthPrompt(""), 3500);
      return;
    }

    if (likeLoading) return;

    // Optimistic UI update
    const nextIsLiked = !isLiked;
    const nextCount = nextIsLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
    setIsLiked(nextIsLiked);
    setLikesCount(nextCount);
    setLikeLoading(true);

    try {
      const data = await toggleBlogLike(id);
      setIsLiked(Boolean(data.isLiked));
      setLikesCount(data.likesCount);
    } catch (err) {
      // Revert on error
      setIsLiked(!nextIsLiked);
      setLikesCount(likesCount);
      console.error("Like toggle failed:", err);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentError("");

    if (!isAuthenticated) {
      setCommentError("Please log in to leave a comment.");
      return;
    }

    if (!commentText.trim()) {
      setCommentError("Comment cannot be empty.");
      return;
    }

    setCommentSubmitting(true);
    try {
      const newComment = await createComment(id, commentText.trim());
      setComments((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (err) {
      setCommentError(
        err.response?.data?.message || "Failed to post comment. Try again."
      );
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    } finally {
      setDeletingCommentId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-32 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-3 border-amber-400 border-t-transparent" />
          <p className="mt-4 text-slate-300 font-medium">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        <NavBar />
        <main className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-24 text-center">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-10 backdrop-blur-xl shadow-2xl">
            <span className="text-4xl">📖</span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              {error || "Article Not Found"}
            </p>
            <h1 className="mt-3 text-3xl font-black [font-family:'Playfair_Display',serif]">
              This blog post does not exist
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              The article may have been removed or the URL is incorrect.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-amber-400 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
            >
              Back To Home
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const authorName =
    post.author?.fullname || post.author?.username || post.author || "Anonymous";
  const authorAvatar = post.author?.avatar;
  const authorInitial = authorName.charAt(0).toUpperCase();
  const publishedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : post.date || "Recent";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <NavBar />

      <main className="relative px-4 pb-24 pt-8 sm:px-6 lg:px-8">
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute -right-20 top-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-96 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-4xl">
          {/* Back Button */}
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300 transition hover:border-amber-400/40 hover:text-amber-300 backdrop-blur-md"
            >
              ← Back
            </button>

            <span className="rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-300">
              {post.category || "Blog"}
            </span>
          </div>

          {/* MAIN BOX ENCLOSING THE BLOG */}
          <article className="overflow-hidden rounded-3xl border border-white/15 bg-slate-900/80 p-6 sm:p-10 md:p-12 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
            {/* Header: Title & Meta */}
            <header className="border-b border-white/10 pb-8">
              <h1 className="text-3xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="mt-4 text-base italic leading-relaxed text-slate-300 border-l-2 border-amber-400/60 pl-4">
                  {post.excerpt}
                </p>
              )}

              {/* Author & Info Bar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {authorAvatar ? (
                    <img
                      src={authorAvatar}
                      alt={authorName}
                      className="h-11 w-11 rounded-full object-cover border border-amber-400/40"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-sm font-bold text-slate-950">
                      {authorInitial}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold text-white">{authorName}</p>
                    <p className="text-xs text-slate-400">
                      {publishedDate} • {post.readTime || getEstimatedReadTime(post.content)}
                    </p>
                  </div>
                </div>

                {/* Quick stats in header */}
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
                    ❤️ {likesCount} {likesCount === 1 ? "like" : "likes"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 border border-white/10">
                    💬 {comments.length} {comments.length === 1 ? "comment" : "comments"}
                  </span>
                </div>
              </div>
            </header>

            {/* Featured Image inside the box (if present) */}
            {(post.media || post.image) && (
              <div className="my-8 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
                <img
                  src={post.media || post.image}
                  alt={post.title}
                  className="max-h-[460px] w-full object-cover"
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="mt-8 text-base leading-8 text-slate-200 sm:text-lg whitespace-pre-line font-normal">
              {post.content}
            </div>

            {/* INTERACTIVE ACTIONS BAR (Like Button & Share) */}
            <div className="mt-10 border-t border-white/10 pt-6">
              {authPrompt && (
                <div className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-center text-xs text-amber-200">
                  🔒 {authPrompt}{" "}
                  <Link to="/login" className="font-bold underline hover:text-white">
                    Sign in
                  </Link>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* LIKE BUTTON */}
                <button
                  type="button"
                  onClick={handleLikeToggle}
                  disabled={likeLoading}
                  className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                    isLiked
                      ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25 ring-2 ring-red-400/40 hover:scale-105"
                      : "border border-white/15 bg-white/5 text-slate-200 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`h-5 w-5 transition-transform duration-200 ${
                      isLiked ? "scale-110" : "group-hover:scale-115"
                    }`}
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                  <span>{isLiked ? "Liked" : "Like"}</span>
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                      isLiked ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {likesCount}
                  </span>
                </button>

                {/* Share / Copy Link */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Article link copied to clipboard!");
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                  🔗 Share Article
                </button>
              </div>
            </div>

            {/* COMMENT SECTION */}
            <section className="mt-12 border-t border-white/10 pt-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white [font-family:'Playfair_Display',serif]">
                  Discussion
                </h2>
                <span className="rounded-full bg-amber-400/10 border border-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-300">
                  {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
                </span>
              </div>

              {/* Comment Input Box */}
              {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mb-10">
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-4 focus-within:border-amber-400/50 focus-within:ring-2 focus-within:ring-amber-400/20 transition">
                    <div className="flex items-center gap-2.5 mb-2 text-xs text-slate-300">
                      <div className="h-6 w-6 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs">
                        {(user?.fullname || user?.username || "U").charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold text-white">
                        {user?.fullname || user?.username}
                      </span>
                    </div>

                    <textarea
                      rows="3"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Share your perspective or thoughts on this article..."
                      className="w-full resize-none bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                    />

                    {commentError && (
                      <p className="mt-2 text-xs text-red-400">{commentError}</p>
                    )}

                    <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                      <span className="text-xs text-slate-400">
                        {commentText.length}/500
                      </span>
                      <button
                        type="submit"
                        disabled={commentSubmitting || !commentText.trim()}
                        className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {commentSubmitting ? "Posting..." : "Post Comment"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md">
                  <p className="text-sm text-slate-300">
                    Join the conversation. Sign in to leave a comment.
                  </p>
                  <Link
                    to="/login"
                    className="mt-3 inline-block rounded-full bg-amber-400 px-6 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300"
                  >
                    Log In to Comment
                  </Link>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-slate-400">
                    <p className="text-3xl mb-2">💬</p>
                    <p className="text-sm font-medium">No comments yet.</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Be the first to share what you think about this story!
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => {
                    const cAuthorName =
                      comment.commentedBy?.fullname ||
                      comment.commentedBy?.username ||
                      "User";
                    const cAuthorInitial = cAuthorName.charAt(0).toUpperCase();
                    const cDate = comment.createdAt
                      ? new Date(comment.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently";

                    const isCommentAuthor =
                      user?._id &&
                      (comment.commentedBy?._id === user._id ||
                        comment.commentedBy === user._id);

                    return (
                      <div
                        key={comment._id}
                        className="group rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 transition hover:border-white/20"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {comment.commentedBy?.avatar ? (
                              <img
                                src={comment.commentedBy.avatar}
                                alt={cAuthorName}
                                className="h-9 w-9 rounded-full object-cover border border-white/10"
                              />
                            ) : (
                              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 border border-white/15 text-xs font-bold text-amber-300">
                                {cAuthorInitial}
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold text-white">
                                {cAuthorName}
                              </p>
                              <p className="text-xs text-slate-400">{cDate}</p>
                            </div>
                          </div>

                          {isCommentAuthor && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              disabled={deletingCommentId === comment._id}
                              title="Delete comment"
                              className="opacity-60 hover:opacity-100 text-red-400 hover:text-red-300 p-1.5 transition rounded-lg hover:bg-red-500/10 text-xs"
                            >
                              {deletingCommentId === comment._id ? "..." : "🗑️ Delete"}
                            </button>
                          )}
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-slate-200 pl-12 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </article>

          {/* MORE STORIES SECTION */}
          {relatedPosts.length > 0 && (
            <section className="mt-16 border-t border-white/10 pt-12">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold [font-family:'Playfair_Display',serif]">
                  More stories
                </h2>
                <Link
                  to="/"
                  className="text-xs font-semibold uppercase tracking-wider text-amber-300 hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {relatedPosts.slice(0, 2).map((item) => (
                  <Link
                    key={item._id}
                    to={`/blog/${item._id}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 transition hover:border-amber-300/40 hover:-translate-y-1 shadow-lg"
                  >
                    {item.media ? (
                      <img
                        src={item.media}
                        alt={item.title}
                        className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-amber-600/20 to-slate-900 flex items-center justify-center text-3xl">
                        ✍️
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">
                        {item.category || "Story"}
                      </span>
                      <h3 className="mt-2 text-lg font-bold text-white group-hover:text-amber-200 transition">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogDetails;
