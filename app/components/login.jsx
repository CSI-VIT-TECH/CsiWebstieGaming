"use client"
import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: '#1a3a52' }}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/50 to-teal-900/60"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-[420px] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
        <div className="p-8 space-y-6">
          {/* Logo Section */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <img 
                src="/placeholder-logo.png" 
                alt="CSI-VIT Logo" 
                className="w-40 h-auto"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
              />
            </div>
            <h2 className="text-xs tracking-[0.3em] text-gray-400 uppercase font-semibold">
              Engineering Ideas Into Reality
            </h2>
          </div>

          {/* Form Section */}
          <div className="space-y-4 mt-8">
            {/* Email Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Enter your mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Set up password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-bold text-lg tracking-wider rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/50 uppercase"
              style={{ fontFamily: 'monospace' }}
            >
              Log In
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-600"></div>
            <span className="text-gray-500 text-sm font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-600"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md">
              <img 
                src="/placeholder-google.png" 
                alt="Google" 
                className="w-6 h-6"
              />
            </button>
            <button className="flex-1 h-12 bg-gray-200 hover:bg-gray-300 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md">
              <img 
                src="/placeholder-linkedin.png" 
                alt="LinkedIn" 
                className="w-6 h-6"
              />
            </button>
          </div>

          {/* Footer Text */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <a 
                href="#" 
                className="text-white hover:text-green-400 underline transition-colors"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;