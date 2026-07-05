/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Plus, Target, Calendar, Sparkles, Sliders, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { SavingsGoal } from "../types";

interface SavingsGoalPlannerProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: SavingsGoal) => void;
  onUpdateGoalProgress: (id: string, newAmount: number) => void;
}

export default function SavingsGoalPlanner({ goals, onAddGoal, onUpdateGoalProgress }: SavingsGoalPlannerProps) {
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(goals[0] || null);
  const [newContribution, setNewContribution] = useState<number>(selectedGoal?.monthlyContribution || 50000);
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  // Form states for creating a new goal
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [category, setCategory] = useState("Investments");

  const handleSelectGoal = (goal: SavingsGoal) => {
    setSelectedGoal(goal);
    setNewContribution(goal.monthlyContribution);
  };

  const handleSliderChange = (val: number) => {
    setNewContribution(val);
  };

  const handleApplyContribution = () => {
    if (selectedGoal) {
      // Simulate modifying the contribution rate
      selectedGoal.monthlyContribution = newContribution;
      alert(`Successfully set monthly SIP contribution for "${selectedGoal.name}" to ₹${newContribution.toLocaleString("en-IN")}.`);
    }
  };

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount || !targetDate || !monthlyContribution) return;

    const newGoal: SavingsGoal = {
      id: `goal-${Date.now()}`,
      name,
      targetAmount: Number(targetAmount),
      currentAmount: 0,
      targetDate,
      monthlyContribution: Number(monthlyContribution),
      category,
      color: "bg-indigo-600",
    };

    onAddGoal(newGoal);
    setSelectedGoal(newGoal);
    setNewContribution(newGoal.monthlyContribution);
    setIsAddingGoal(false);

    // Reset fields
    setName("");
    setTargetAmount("");
    setTargetDate("");
    setMonthlyContribution("");
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Calculate projected months remaining with current slider rate
  const getProjectedTimeline = () => {
    if (!selectedGoal) return { months: 0, year: 2026, monthName: "N/A" };
    const remaining = selectedGoal.targetAmount - selectedGoal.currentAmount;
    if (remaining <= 0) return { months: 0, year: 2026, monthName: "Completed" };
    const months = Math.ceil(remaining / newContribution);
    
    const target = new Date();
    target.setMonth(target.getMonth() + months);
    const monthName = target.toLocaleString("default", { month: "long" });
    const year = target.getFullYear();
    
    return { months, year, monthName };
  };

  const projection = getProjectedTimeline();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: List of Goals & Create Goal */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Savings Goals</h3>
              <p className="text-xs text-slate-400">Track and optimize your premium wealth targets</p>
            </div>
            <button
              onClick={() => setIsAddingGoal(!isAddingGoal)}
              className="text-xs bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-sky-500/10 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Target
            </button>
          </div>

          {isAddingGoal && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleCreateGoal}
              className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Goal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., London Vacation Villa"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option>Automobile</option>
                    <option>Retirement</option>
                    <option>Travel</option>
                    <option>Investments</option>
                    <option>Real Estate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    placeholder="500000"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Monthly Contribution (₹)</label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="25000"
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingGoal(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 py-2 px-4 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-xs font-bold text-white bg-sky-500 hover:bg-sky-600 py-2 px-4 rounded-xl shadow-md shadow-sky-500/10 cursor-pointer"
                >
                  Create Target
                </button>
              </div>
            </motion.form>
          )}

          {/* Goals Stack */}
          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              const isSelected = selectedGoal?.id === goal.id;

              return (
                <div
                  key={goal.id}
                  onClick={() => handleSelectGoal(goal)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-sky-500 bg-sky-50/20 shadow-sm"
                      : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg text-white ${goal.color}`}>
                        <Target className="h-4.5 w-4.5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{goal.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                          {goal.category} • Target Date: {goal.targetDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">
                        {percentage}% Saved
                      </span>
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${goal.color}`} style={{ width: `${percentage}%` }} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-3 font-mono">
                    <div>
                      <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Saved</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(goal.currentAmount)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-sans block uppercase font-bold">Target</span>
                      <span className="font-semibold text-slate-800">{formatCurrency(goal.targetAmount)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Column: AI Projections & Simulator */}
      <div className="space-y-6">
        {selectedGoal ? (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-sky-50 rounded-lg">
                  <Sparkles className="h-4 w-4 text-sky-600" />
                </span>
                <span className="text-[10px] bg-sky-50 text-sky-700 font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                  Timeline Optimizer
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2">
                Simulate: {selectedGoal.name}
              </h3>
              
              <p className="text-xs text-slate-400 mb-6">
                Adjust monthly auto-SIP deposits dynamically to view projected completion dates based on custom debt-fund interest indexes.
              </p>

              {/* Slider Controls */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-600 mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Sliders className="h-3.5 w-3.5 text-slate-400" />
                      Monthly Contribution
                    </span>
                    <span className="text-slate-900 font-bold font-mono">{formatCurrency(newContribution)}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="200000"
                    step="5000"
                    value={newContribution}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    className="w-full accent-sky-500 h-1 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                    <span>₹10,000</span>
                    <span>₹2,00,000</span>
                  </div>
                </div>

                {/* AI Projection Output */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Estimated Milestone Match</p>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                        {projection.monthName} {projection.year}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Approximately <span className="font-bold text-sky-600">{projection.months} months</span> remaining.
                      </p>
                    </div>
                  </div>

                  {newContribution > selectedGoal.monthlyContribution ? (
                    <div className="text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-100/55 rounded-lg p-2 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      Saving at this level completes your goal {Math.max(1, Math.round((selectedGoal.targetAmount - selectedGoal.currentAmount) / selectedGoal.monthlyContribution - projection.months))} month(s) ahead of standard schedule!
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <button
              onClick={handleApplyContribution}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer mt-6"
            >
              Lock Dynamic Auto-SIP
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-center">
            <p className="text-xs text-slate-400">Select a target to launch the AI optimization timeline simulator.</p>
          </div>
        )}
      </div>

    </div>
  );
}
