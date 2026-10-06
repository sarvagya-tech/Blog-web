import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { createBlogPost } from '../service/axios';
import { useAuth } from '../service/Authcontext';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [excerpt, setExcerpt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file is too large. Maximum size is 5MB.');
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isAuthenticated) {
      setError('You must be logged in to publish a blog. Please log in first.');
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }

    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }

    if (content.trim().length < 10) {
      setError('Content must be at least 10 characters long.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('category', category.trim() || 'General');
      formData.append('content', content.trim());
      formData.append('excerpt', excerpt.trim());
      if (image) {
        formData.append('media', image);
      }

      const response = await createBlogPost(formData);

      setSuccess('Blog published successfully!');
      setTitle('');
      setCategory('');
      setContent('');
      setExcerpt('');
      setImage(null);
      setImagePreview(null);

      const createdId = response?.data?._id || response?.data?.id;
      setTimeout(() => {
        if (createdId) {
          navigate(`/blog/${createdId}`);
        } else {
          navigate('/blog');
        }
      }, 1000);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong while publishing the blog.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="relative min-h-screen bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
        {/* Background gradient effects */}
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-32 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          {/* Auth warning banner if user not logged in */}
          {!authLoading && !isAuthenticated && (
            <div className="mb-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-200 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔒</span>
                <div>
                  <p className="font-semibold text-white">Authentication Required</p>
                  <p className="text-xs text-amber-300">You need to log in to your account before publishing a blog.</p>
                </div>
              </div>
              <Link
                to="/login"
                className="whitespace-nowrap rounded-full bg-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:bg-amber-300"
              >
                Log In Now
              </Link>
            </div>
          )}

          {/* Header Section */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              Share Your Ideas
            </p>
            <h1 className="text-4xl font-black leading-tight text-white [font-family:'Playfair_Display',serif] sm:text-5xl">
              Create Your Blog Post
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Share your thoughts, stories, and insights with our community. Write, create, and inspire.
            </p>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl sm:p-10"
          >
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Blog Title <span className="text-amber-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter an engaging title for your blog..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Category Input */}
            <div>
              <label htmlFor="category" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Technology, Design, Productivity, Lifestyle..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Excerpt Input */}
            <div>
              <label htmlFor="excerpt" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Write a brief summary of your blog post (optional, auto-generated from content if left blank)..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 resize-vertical transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Content Input */}
            <div>
              <label htmlFor="content" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Content <span className="text-amber-400">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                rows="12"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your full blog content here..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 resize-vertical transition focus:border-amber-300/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="mb-3 block text-sm font-semibold uppercase tracking-[0.12em] text-amber-100">
                Featured Image <span className="text-xs font-normal text-slate-400">(Optional, Max 5MB)</span>
              </label>
              <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-6 text-center transition hover:border-amber-300/40 hover:bg-white/10">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label htmlFor="image" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-lg object-cover shadow-md"
                      />
                      <p className="text-xs text-amber-300 font-medium">{image?.name}</p>
                      <p className="text-xs text-slate-400">Click to choose another image</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-2xl">📸</div>
                      <p className="text-sm font-medium text-slate-300">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-400">PNG, JPG, WEBP, GIF up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Status Messages & Action Buttons */}
            <div className="space-y-4 pt-4">
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300 flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300 flex items-center gap-2">
                  <span>✅</span>
                  <span>{success}</span>
                </div>
              )}

              <div className="flex gap-4 sm:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-white/40 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !isAuthenticated}
                  className="rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-950 transition hover:shadow-lg hover:shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Publishing...' : 'Publish Blog'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;