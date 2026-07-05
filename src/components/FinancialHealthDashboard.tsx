/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { TrendingUp, Award, Wallet, Shield, CheckCircle, Activity, Sparkles, FlameKindling } from "lucide-react";
import { motion } from "motion/react";
import { UserProfile } from "../types";

interface FinancialHealthDashboardProps {
  user: UserProfile;
  onAuditClick: () => void;
  onGoToTab: (tab: string) => void;
}

export default function FinancialHealthDashboard({ user, onAuditClick, onGoToTab }: FinancialHealthDashboardProps) {
  // Format Currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Upper Grid - Core Wealth Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Net Worth Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-sky-50 rounded-xl">
              <Wallet className="h-6 w-6 text-sky-600" />
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +4.2% This Quarter
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Net Worth
          </p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1 font-mono">
            {formatCurrency(user.netWorth)}
          </h2>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">Assets:</span> {formatCurrency(3525300)}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Liabilities:</span> {formatCurrency(680000)}
            </div>
          </div>
        </motion.div>

        {/* Credit Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100 font-semibold px-2.5 py-0.5 rounded-full">
              Excellent Standing
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            CIBIL Score
          </p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1 font-mono">
            {user.creditScore} <span className="text-xs text-slate-400 font-normal">/ 900</span>
          </h2>
          
          {/* Custom score bar representation */}
          <div className="w-full bg-slate-100 h-2 rounded-full mt-5 overflow-hidden flex">
            <div className="bg-red-400 h-full" style={{ width: "30%" }} />
            <div className="bg-amber-400 h-full" style={{ width: "20%" }} />
            <div className="bg-emerald-500 h-full" style={{ width: "50%" }} />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1.5 uppercase">
            <span>Poor (300)</span>
            <span>Good</span>
            <span className="text-emerald-600">Perfect (900)</span>
          </div>
        </motion.div>

        {/* Savings Rate Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:scale-150 transition-all duration-500" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <Shield className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" />
              Optimal
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Savings Efficiency Rate
          </p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mt-1 font-mono">
            {user.savingsRate}%
          </h2>
          <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">Monthly In:</span> {formatCurrency(user.monthlyIncome)}
            </div>
            <div>
              <span className="font-semibold text-slate-700">Spent:</span> {formatCurrency(user.monthlySpending)}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Main Analysis Section: Health Audit and Telemetry Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Telemetry Index Toggles */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-sky-50 rounded-lg flex items-center justify-center">
                  <Activity className="h-4.5 w-4.5 text-sky-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">SBI Health Telemetry Index</h3>
                  <p className="text-xs text-slate-400">Algorithmic checks aligned with Basel-IV safety standards</p>
                </div>
              </div>
              <span className="text-xs bg-sky-50 text-sky-700 font-bold px-2.5 py-1 rounded-lg">
                Overall: Excellent (91/100)
              </span>
            </div>

            {/* Progress Bars */}
            <div className="space-y-5">
              {/* Metric 1 */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Liquidity Coverage Ratio (LCR)
                  </span>
                  <span className="text-slate-900 font-bold">142%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "95%" }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Excellent cash buffer. Covers 30 days of high spending shocks.</p>
              </div>

              {/* Metric 2 */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-sky-500" />
                    Debt-to-Income (DTI) Leverage
                  </span>
                  <span className="text-slate-900 font-bold">22.4%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-full" style={{ width: "78%" }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Highly conservative. Under the 36% premium household threshold.</p>
              </div>

              {/* Metric 3 */}
              <div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Diversification Ratio (Equities vs Debt)
                  </span>
                  <span className="text-slate-900 font-bold">64 : 36</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: "64%" }} />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Equities skewed. We suggest rebalancing with debt/hybrid tools.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-50 flex flex-wrap gap-3">
            <button
              onClick={() => onGoToTab("analytics")}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50/50 hover:bg-sky-50 py-2 px-4 rounded-xl border border-sky-100/50 hover:border-sky-100 transition-all cursor-pointer"
            >
              Analyze Category Spending
            </button>
            <button
              onClick={() => onGoToTab("goals")}
              className="text-xs font-semibold text-slate-600 hover:text-slate-700 bg-slate-50 hover:bg-slate-100/70 py-2 px-4 rounded-xl border border-slate-200/50 hover:border-slate-200 transition-all cursor-pointer"
            >
              Check Savings Allocations
            </button>
          </div>
        </div>

        {/* AI Financial Health Auditor Action Frame */}
        <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-2xl p-6 shadow-md text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle logo/icon in background */}
          <div className="absolute -bottom-10 -right-10 opacity-5">
            <Sparkles className="h-56 w-56 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-sky-300" />
              </span>
              <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-sky-500/30">
                NeoAgent AI Audit
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight mb-2">
              Proactive Wealth Optimization Engine
            </h3>
            
            <p className="text-xs text-sky-100/80 leading-relaxed mb-4">
              Analyze recent market fluctuations against your portfolio diversification and savings rates. Our high-performance neural nodes can draft a comprehensive multi-tier capital allocation strategy instantly.
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-xs text-sky-200">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Find ₹17,000 extra yield in MOD splits
              </li>
              <li className="flex items-center gap-2 text-xs text-sky-200">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Audit ₹35,000 tax-saving shortfalls
              </li>
              <li className="flex items-center gap-2 text-xs text-sky-200">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                Optimize SUV goal by 2 calendar months
              </li>
            </ul>
          </div>

          <button
            onClick={onAuditClick}
            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs py-3 px-4 rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FlameKindling className="h-4 w-4" />
            Launch Autonomous AI Audit
          </button>
        </div>

      </div>
    </div>
  );
}
