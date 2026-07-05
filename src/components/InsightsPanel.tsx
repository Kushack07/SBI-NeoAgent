/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, HelpCircle, Flame, Target, AlertTriangle, TrendingUp, HelpCircleIcon } from "lucide-react";
import { InsightItem } from "../types";

interface InsightsPanelProps {
  insights: InsightItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function InsightsPanel({ insights, isLoading, onRefresh }: InsightsPanelProps) {
  return (
    <div className="space-y-6">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Personalized AI Financial Audits</h3>
          <p className="text-xs text-slate-400">Dynamic telemetry logs processed server-side via Google Gemini models</p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs py-2 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          {isLoading ? (
            <span className="inline-block h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              Re-Evaluate Portfolios
            </>
          )}
        </button>
      </div>

      {/* Insights Stack */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((ins) => {
          // Determine color profiles based on type
          let typeColor = "bg-sky-50 text-sky-700 border-sky-100";
          let icon = <HelpCircle className="h-4 w-4" />;

          if (ins.type === "warning") {
            typeColor = "bg-red-50 text-red-700 border-red-100";
            icon = <AlertTriangle className="h-4.5 w-4.5" />;
          } else if (ins.type === "opportunity") {
            typeColor = "bg-emerald-50 text-emerald-700 border-emerald-100";
            icon = <TrendingUp className="h-4.5 w-4.5" />;
          } else if (ins.type === "tip") {
            typeColor = "bg-blue-50 text-blue-700 border-blue-100";
            icon = <Flame className="h-4.5 w-4.5 text-blue-600" />;
          } else if (ins.type === "milestone") {
            typeColor = "bg-purple-50 text-purple-700 border-purple-100";
            icon = <Target className="h-4.5 w-4.5" />;
          }

          return (
            <div
              key={ins.id}
              className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold py-0.5 px-2.5 rounded-full border ${typeColor} flex items-center gap-1`}>
                    {icon}
                    {ins.type.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {ins.date}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{ins.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{ins.description}</p>
              </div>

              {ins.impactValue && (
                <div className="border-t border-slate-50 pt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Estimated Gain</span>
                    <span className="text-xs font-bold text-slate-800">{ins.impactValue}</span>
                  </div>
                  <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded font-medium">
                    {ins.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
