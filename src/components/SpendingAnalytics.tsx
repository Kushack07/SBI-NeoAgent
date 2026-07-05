/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TransactionCategory, Transaction } from "../types";
import { ArrowDownRight, ArrowUpRight, Percent, BarChart3, PieChart, Landmark } from "lucide-react";

interface SpendingAnalyticsProps {
  transactions: Transaction[];
}

export default function SpendingAnalytics({ transactions }: SpendingAnalyticsProps) {
  const [activeChart, setActiveChart] = useState<"category" | "trend">("category");

  // Sum categories
  const categoriesSum = transactions
    .filter((tx) => tx.type === "debit" && tx.status !== "flagged")
    .reduce((acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    }, {} as Record<TransactionCategory, number>);

  const totalDebit = Object.values(categoriesSum).reduce((sum, val) => sum + val, 0);

  const categoryColors: Record<TransactionCategory, string> = {
    [TransactionCategory.FOOD_DINING]: "bg-orange-500",
    [TransactionCategory.SHOPPING_LIFESTYLE]: "bg-pink-500",
    [TransactionCategory.TRAVEL_TRANSPORT]: "bg-blue-500",
    [TransactionCategory.UTILITIES_BILLS]: "bg-indigo-500",
    [TransactionCategory.INVESTMENTS]: "bg-emerald-500",
    [TransactionCategory.HEALTHCARE]: "bg-red-500",
    [TransactionCategory.OTHERS]: "bg-slate-500",
  };

  const categoryBorderColors: Record<TransactionCategory, string> = {
    [TransactionCategory.FOOD_DINING]: "stroke-orange-500",
    [TransactionCategory.SHOPPING_LIFESTYLE]: "stroke-pink-500",
    [TransactionCategory.TRAVEL_TRANSPORT]: "stroke-blue-500",
    [TransactionCategory.UTILITIES_BILLS]: "stroke-indigo-500",
    [TransactionCategory.INVESTMENTS]: "stroke-emerald-500",
    [TransactionCategory.HEALTHCARE]: "stroke-red-500",
    [TransactionCategory.OTHERS]: "stroke-slate-500",
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Convert categories object to array sorted by value
  const categoryArray = Object.entries(categoriesSum).map(([category, value]) => ({
    category: category as TransactionCategory,
    value,
    percentage: Math.round((value / totalDebit) * 100) || 0,
  })).sort((a, b) => b.value - a.value);

  // SVG parameters for custom Doughnut chart
  let cumulativePercent = 0;
  const donutRadius = 50;
  const donutCircumference = 2 * Math.PI * donutRadius;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Columns - Dynamic SVG Visuals */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Spending Telemetry</h3>
              <p className="text-xs text-slate-400">Granular view of your monthly capital outflows</p>
            </div>

            {/* Selector */}
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
              <button
                onClick={() => setActiveChart("category")}
                className={`text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  activeChart === "category" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <PieChart className="h-3.5 w-3.5" />
                Category Share
              </button>
              <button
                onClick={() => setActiveChart("trend")}
                className={`text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                  activeChart === "trend" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5" />
                Monthly Cashflow
              </button>
            </div>
          </div>

          {/* Interactive Chart Area */}
          {activeChart === "category" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[220px]">
              
              {/* Doughnut SVG Drawing */}
              <div className="relative flex justify-center">
                <svg width="180" height="180" viewBox="0 0 140 140" className="transform -rotate-90">
                  <circle
                    cx="70"
                    cy="70"
                    r={donutRadius}
                    fill="transparent"
                    stroke="#f1f5f9"
                    strokeWidth="15"
                  />
                  {categoryArray.map((item, index) => {
                    const strokeDasharray = `${(item.percentage / 100) * donutCircumference} ${donutCircumference}`;
                    const strokeDashoffset = -((cumulativePercent / 100) * donutCircumference);
                    cumulativePercent += item.percentage;

                    return (
                      <circle
                        key={index}
                        cx="70"
                        cy="70"
                        r={donutRadius}
                        fill="transparent"
                        className={categoryBorderColors[item.category]}
                        strokeWidth="15"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    );
                  })}
                </svg>
                {/* Center Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total spent</span>
                  <span className="text-lg font-bold text-slate-900 font-mono mt-0.5">{formatCurrency(totalDebit)}</span>
                </div>
              </div>

              {/* Progress bars share */}
              <div className="space-y-3.5">
                {categoryArray.slice(0, 4).map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className={`h-2.5 w-2.5 rounded-full ${categoryColors[item.category]}`} />
                        {item.category}
                      </span>
                      <span className="font-mono font-bold text-slate-900">
                        {formatCurrency(item.value)} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${categoryColors[item.category]}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            /* Bar Trend Chart */
            <div className="space-y-6 min-h-[220px] flex flex-col justify-end">
              <div className="flex justify-between items-end gap-3 h-40 px-4">
                
                {/* Jan */}
                <div className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div className="w-4 bg-emerald-500 rounded-t h-[65%] hover:opacity-80 transition-all cursor-pointer" title="Inflow: ₹2,10,000" />
                    <div className="w-4 bg-sky-500 rounded-t h-[40%] hover:opacity-80 transition-all cursor-pointer" title="Spent: ₹1,20,000" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">MAR</span>
                </div>

                {/* Feb */}
                <div className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div className="w-4 bg-emerald-500 rounded-t h-[72%] hover:opacity-80 transition-all cursor-pointer" title="Inflow: ₹2,30,000" />
                    <div className="w-4 bg-sky-500 rounded-t h-[42%] hover:opacity-80 transition-all cursor-pointer" title="Spent: ₹1,30,000" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">APR</span>
                </div>

                {/* Mar */}
                <div className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div className="w-4 bg-emerald-500 rounded-t h-[80%] hover:opacity-80 transition-all cursor-pointer" title="Inflow: ₹2,50,000" />
                    <div className="w-4 bg-sky-500 rounded-t h-[45%] hover:opacity-80 transition-all cursor-pointer" title="Spent: ₹1,40,000" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">MAY</span>
                </div>

                {/* Apr */}
                <div className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div className="w-4 bg-emerald-500 rounded-t h-[90%] hover:opacity-80 transition-all cursor-pointer" title="Inflow: ₹2,50,000" />
                    <div className="w-4 bg-sky-500 rounded-t h-[36%] hover:opacity-80 transition-all cursor-pointer" title="Spent: ₹1,05,000" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold font-mono">JUN (Active)</span>
                </div>

              </div>

              {/* Legend indicators */}
              <div className="flex items-center justify-center gap-6 text-xs text-slate-500 font-medium pt-3 border-t border-slate-50">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Inward Income Credit (Avg: ₹2,35,000)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                  Aggregate Outward Spent (Avg: ₹1,23,000)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic statistics row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100 mt-6 text-xs">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Discretionary Spend Factor</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">38.4% of Income</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Highest Category Outflow</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">SIP Investments (₹50k)</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Dynamic Cash Reserve</p>
            <p className="text-sm font-bold text-slate-800 mt-0.5">₹1,45,000 Surplus</p>
          </div>
        </div>
      </div>

      {/* Right Column - Cashflow summary box & SBI limits */}
      <div className="space-y-6">
        
        {/* cash status */}
        <div className="bg-gradient-to-tr from-sky-50 to-blue-50 border border-sky-100/60 rounded-2xl p-6">
          <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Landmark className="h-4.5 w-4.5 text-sky-600" />
            Cashflow Statement
          </h4>

          <div className="space-y-4">
            
            {/* inflow */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Incoming Credits</p>
                <h5 className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
                  + {formatCurrency(250000)}
                </h5>
              </div>
              <span className="p-1.5 bg-emerald-100/50 rounded-lg text-emerald-600">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>

            {/* outflow */}
            <div className="flex items-start justify-between border-t border-sky-200/30 pt-3">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Outgoing Debits</p>
                <h5 className="text-lg font-bold text-sky-700 font-mono mt-0.5">
                  - {formatCurrency(105000)}
                </h5>
              </div>
              <span className="p-1.5 bg-sky-200/40 rounded-lg text-sky-600">
                <ArrowDownRight className="h-4 w-4" />
              </span>
            </div>

            {/* aggregate liquidity */}
            <div className="flex items-start justify-between border-t border-sky-200/50 pt-4">
              <div>
                <p className="text-[10px] font-bold text-sky-800 uppercase">Idle Reserve Savings</p>
                <h5 className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">
                  {formatCurrency(145000)}
                </h5>
                <p className="text-[10px] text-slate-500 mt-1">Recommended to deploy to MOD.</p>
              </div>
            </div>

          </div>
        </div>

        {/* CIBIL telemetry insight */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2 font-semibold">
            <Percent className="h-4.5 w-4.5 text-slate-400" />
            Aggregate Interest Spreads
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Your aggregate loan interest rate sits at a record-low **8.35%**, and credit card balances are paid on auto-debit loops. Keep your credit utilization ratio under 12% to maintain your top-tier CIBIL score.
          </p>
        </div>

      </div>

    </div>
  );
}
