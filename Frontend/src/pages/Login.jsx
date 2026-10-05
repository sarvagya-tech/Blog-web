import React, { useState } from 'react';
import { loginUser } from '../service/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../service/Authcontext';
import NavBar from '../components/NavBar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email: email.trim(), password });
      login(response);
      setSuccess('Successfully signed in! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <NavBar />

      <div className="relative flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative w-full max-w-md">
          {/* Card Container */}
          <div className="rounded-3xl border border-white/15 bg-slate-900/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl ring-1 ring-white/5">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-black text-white [font-family:'Playfair_Display',serif]">
                Welcome Back
              </h2>
              <p className="mt-2 text-xs uppercase tracking-wider text-slate-400">
                Sign in to continue to InkPress
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Email Field */}
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
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-amber-400/50 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition"
                />
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90"
                  >
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
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
                className="w-full mt-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-950 shadow-lg shadow-amber-400/20 transition hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer Prompt */}
            <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-bold text-amber-400 hover:text-amber-300 transition"
              >
                Create one now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
