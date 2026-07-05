/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldCheck, ArrowRight, Lock, Mail, Landmark } from "lucide-react";
import { motion } from "motion/react";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("neoagent@sbi.co.in");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate authentic private wealth validation
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  const fillDemoCredentials = () => {
    setEmail("neoagent@sbi.co.in");
    setPassword("password123");
  };

  return (
    <div id="login-container" className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Graphic Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-3xl -z-10" />

      {/* Main Login Frame */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8 relative z-10"
      >
        {/* SBI Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-16 w-16 bg-gradient-to-tr from-sky-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20 mb-4">
            <Landmark className="text-white h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
            SBI <span className="text-sky-500">NeoAgent</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium uppercase tracking-wider">
            Private Wealth Autonomous Portal
          </p>
        </div>

        {/* Security Badge */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 mb-6 flex items-start gap-2.5">
          <ShieldCheck className="text-sky-600 h-5 w-5 shrink-0 mt-0.5" />
          <div className="text-xs text-sky-800 leading-relaxed">
            <span className="font-semibold">Secured by Gemini Enterprise</span>. 
            Secure end-to-end tokenized link established with your primary SBI Wealth Account.
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Wealth ID / Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                placeholder="wealth_id@sbi.co.in"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
              Passcode
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all font-medium"
                placeholder="Enter private passcode"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-sky-500/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mt-6"
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Authorize Private Wealth
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Demo Account Quick Bypass */}
        <div className="mt-6 border-t border-slate-100 pt-4 text-center">
          <p className="text-[11px] text-slate-400 mb-2 font-medium">
            HACKATHON DEMO BYPASS
          </p>
          <button
            onClick={fillDemoCredentials}
            className="text-xs text-sky-600 font-semibold hover:text-sky-700 bg-sky-50/50 hover:bg-sky-50 py-1.5 px-3 rounded-lg border border-sky-100/50 hover:border-sky-100 transition-all cursor-pointer"
          >
            Auto-Fill Credentials & Proceed
          </button>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 text-center text-slate-400 text-[10px] tracking-widest uppercase font-semibold">
        State Bank of India • © 2026 All Rights Reserved
      </div>
    </div>
  );
}
