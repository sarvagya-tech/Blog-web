import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../service/axios';
import { useAuth } from '../service/Authcontext';
import NavBar from '../components/NavBar';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fullname.trim() || !username.trim() || !email.trim() || !password) {
      setError('All fields are required.');
      return;
    }

    if (!avatar) {
      setError('Please upload an avatar image for your profile.');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('fullname', fullname.trim());
      formData.append('username', username.trim());
      formData.append('email', email.trim());
      formData.append('password', password);
      formData.append('avatar', avatar);

      const response = await registerUser(formData);
      login(response);
      setSuccess('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <NavBar />

      <div className="relative flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Background ambient orbs */}
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative w-full max-w-lg">
          {/* Card Container */}
          <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-black text-white [font-family:'Playfair_Display',serif]">
                Join InkPress
              </h2>
              <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
                Start publishing stories and connecting with readers
              </p>
            </div>

            {/* Error & Success Messages */}
            {error && (
              <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs text-emerald-300 flex items-center gap-2">
                <span>✅</span>
                <span>{success}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Avatar Upload Area with Preview */}
              <div className="flex flex-col items-center justify-center mb-4">
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <label
                  htmlFor="avatar"
                  className="group relative cursor-pointer flex flex-col items-center"
                >
                  <div className="relative h-20 w-20 rounded-full border-2 border-dashed border-amber-400/40 p-1 transition group-hover:border-amber-300">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white/5 text-2xl">
                        📸
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-slate-950/60 opacity-0 group-hover:opacity-100 transition">
                      <span className="text-[10px] font-bold uppercase text-amber-300">
                        Change
                      </span>
                    </div>
                  </div>
                  <span className="mt-2 text-xs font-semibold text-amber-300 group-hover:underline">
                    {avatar ? avatar.name : 'Upload Profile Avatar *'}
                  </span>
                </label>
              </div>

              {/* Full Name & Username */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    required
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2"
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="janedoe"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white placeholder-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-amber-400/20 transition hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            {/* Footer Prompt */}
            <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-amber-400 hover:text-amber-300 transition"
              >
                Sign in here →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
