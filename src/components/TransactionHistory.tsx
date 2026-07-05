/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Search, Filter, AlertTriangle, ArrowUpRight, ArrowDownRight, ShieldCheck, Download } from "lucide-react";
import { Transaction, TransactionCategory } from "../types";

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"all" | "debit" | "credit" | "flagged">("all");

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleDownloadCSV = () => {
    alert("Full private ledger export initialized. SEC-certified CSV report dispatched to your verified email: neoagent@sbi.co.in");
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Search
    const matchesSearch =
      tx.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Tab filters
    if (selectedFilter === "debit") return tx.type === "debit";
    if (selectedFilter === "credit") return tx.type === "credit";
    if (selectedFilter === "flagged") return tx.status === "flagged" || tx.riskScore > 50;
    
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      
      {/* Top action controls */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Ledger Audit Trail</h3>
            <p className="text-xs text-slate-400">Comprehensive cryptographic ledger of your private banking credentials</p>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export Certified CSV
          </button>
        </div>

        {/* Filters and search bar */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search merchants, categories, or cities..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all"
            />
          </div>

          {/* Filters Selector Tabs */}
          <div className="bg-slate-50 p-1 border border-slate-100 rounded-xl flex gap-1">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                selectedFilter === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedFilter("debit")}
              className={`text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                selectedFilter === "debit" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Debits
            </button>
            <button
              onClick={() => setSelectedFilter("credit")}
              className={`text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                selectedFilter === "credit" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Credits
            </button>
            <button
              onClick={() => setSelectedFilter("flagged")}
              className={`text-xs font-bold py-1.5 px-3 rounded-lg cursor-pointer transition-all ${
                selectedFilter === "flagged" ? "bg-white text-red-700 shadow-xs" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              High Risk
            </button>
          </div>
        </div>
      </div>

      {/* Ledger Table rendering */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Transaction Details</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Method / Origin</th>
              <th className="py-3 px-6 text-center">Threat Risk</th>
              <th className="py-3 px-6 text-right">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                  No matching transaction logs found under current filter set.
                </td>
              </tr>
            ) : (
              filteredTransactions.map((tx) => {
                const isCredit = tx.type === "credit";
                const isFlagged = tx.status === "flagged";

                return (
                  <tr
                    key={tx.id}
                    className={`hover:bg-slate-50/50 transition-colors ${
                      isFlagged ? "bg-red-50/5" : ""
                    }`}
                  >
                    {/* Merchant & date */}
                    <td className="py-4 px-6 flex items-center gap-3">
                      <span className={`p-2 rounded-xl ${
                        isFlagged
                          ? "bg-red-100 text-red-600"
                          : isCredit
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-sky-100 text-sky-600"
                      }`}>
                        {isFlagged ? (
                          <AlertTriangle className="h-4.5 w-4.5" />
                        ) : isCredit ? (
                          <ArrowUpRight className="h-4.5 w-4.5" />
                        ) : (
                          <ArrowDownRight className="h-4.5 w-4.5" />
                        )}
                      </span>
                      <div>
                        <p className={`font-bold ${isFlagged ? "text-red-700" : "text-slate-900"}`}>
                          {tx.merchant}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {new Date(tx.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })} at {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-6">
                      <span className="bg-slate-100 border border-slate-200/50 text-slate-600 px-2.5 py-1 rounded-md font-medium text-[10px]">
                        {tx.category}
                      </span>
                    </td>

                    {/* Method / origin */}
                    <td className="py-4 px-6">
                      <p className="font-semibold text-slate-700">{tx.paymentMethod}</p>
                      <p className="text-[10px] text-slate-400">{tx.location}</p>
                    </td>

                    {/* Threat Score index */}
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          tx.riskScore > 50
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : tx.riskScore > 10
                            ? "bg-amber-100 text-amber-700 border border-amber-200"
                            : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                        }`}>
                          {tx.riskScore}% Risk
                        </span>
                      </div>
                    </td>

                    {/* Value */}
                    <td className="py-4 px-6 text-right">
                      <span className={`font-mono font-extrabold text-sm ${
                        isCredit ? "text-emerald-600" : isFlagged ? "text-red-600" : "text-slate-900"
                      }`}>
                        {isCredit ? "+" : "-"} {formatCurrency(tx.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
