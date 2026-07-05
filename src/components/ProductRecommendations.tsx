/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sparkles, ArrowUpRight, ShieldCheck, Percent, CreditCard, ChevronRight } from "lucide-react";
import { ProductRecommendation } from "../types";

interface ProductRecommendationsProps {
  products: ProductRecommendation[];
  onApply: (productName: string) => void;
}

export default function ProductRecommendations({ products, onApply }: ProductRecommendationsProps) {
  return (
    <div className="space-y-6">
      
      {/* Header and subtitle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Custom SBI Wealth Matches</h3>
          <p className="text-xs text-slate-400">Personalized algorithmic fits based on monthly cash buffers and interest spreads</p>
        </div>
        <span className="text-[10px] bg-sky-50 text-sky-700 font-bold uppercase tracking-wider py-1 px-3 rounded-md flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" />
          AI Matching: Live
        </span>
      </div>

      {/* Recommended Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((prod) => {
          const isExcellent = prod.suitabilityScore >= 90;

          return (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Score badge & category */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold py-1 px-2.5 rounded-full ${
                    isExcellent ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-sky-50 text-sky-700 border border-sky-100"
                  }`}>
                    {prod.suitabilityScore}% Suitability Match
                  </span>
                  
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    {prod.type}
                  </span>
                </div>

                {/* Product details */}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {prod.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  {prod.description}
                </p>

                {/* Special Perks / Rates box */}
                {prod.rewardRate || prod.interestRate ? (
                  <div className="bg-slate-50 border border-slate-100/55 rounded-xl p-2.5 my-4 flex items-center gap-2">
                    <span className="p-1.5 bg-sky-100/50 rounded-lg text-sky-700">
                      <Percent className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {prod.rewardRate || prod.interestRate}
                    </span>
                  </div>
                ) : (
                  <div className="my-4" />
                )}

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {prod.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                      <ChevronRight className="h-3.5 w-3.5 text-sky-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Justification Quote Block */}
              <div className="border-t border-slate-50 pt-4 mt-auto">
                <div className="bg-sky-50/20 border border-dashed border-sky-100/50 rounded-xl p-3 mb-4">
                  <p className="text-[10px] font-bold text-sky-800 flex items-center gap-1 uppercase tracking-wide">
                    <Sparkles className="h-3 w-3" />
                    NeoAgent Allocation Insight
                  </p>
                  <p className="text-[10px] text-slate-600 leading-normal italic mt-1">
                    "{prod.aiReasoning}"
                  </p>
                </div>

                <button
                  onClick={() => onApply(prod.name)}
                  className="w-full bg-slate-50 group-hover:bg-sky-500 hover:bg-sky-600 group-hover:text-white text-slate-700 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  {prod.actionUrl || "Details & Apply"}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
