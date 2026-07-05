/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
  Landmark,
  Shield,
  Bot,
  User,
  LogOut,
  LayoutDashboard,
  Coins,
  ShieldAlert,
  Sparkles,
  History,
  TrendingUp,
  Sliders,
  Sparkle
} from "lucide-react";

// Mock Data & Custom Subcomponents
import { MOCK_USER, MOCK_TRANSACTIONS, MOCK_SAVINGS_GOALS, MOCK_FRAUD_ALERTS, MOCK_RECOMMENDATIONS, MOCK_INSIGHTS } from "./data";
import { ChatMessage, Transaction, SavingsGoal, FraudAlert, InsightItem } from "./types";

import LoginScreen from "./components/LoginScreen";
import FinancialHealthDashboard from "./components/FinancialHealthDashboard";
import SavingsGoalPlanner from "./components/SavingsGoalPlanner";
import FraudDetectionDashboard from "./components/FraudDetectionDashboard";
import ProductRecommendations from "./components/ProductRecommendations";
import SpendingAnalytics from "./components/SpendingAnalytics";
import InsightsPanel from "./components/InsightsPanel";
import TransactionHistory from "./components/TransactionHistory";
import ChatAssistant from "./components/ChatAssistant";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  // Dynamic application state
  const [userProfile, setUserProfile] = useState(MOCK_USER);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(MOCK_SAVINGS_GOALS);
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>(MOCK_FRAUD_ALERTS);
  const [insights, setInsights] = useState<InsightItem[]>(MOCK_INSIGHTS);
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS);

  // Chat Log State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      sender: "assistant",
      text: "Greetings, Aditya Vardhan. I am your **SBI NeoAgent** Autonomous Relationship Manager. I have audited your private wealth metrics. Your aggregate portfolio value is in stellar health (**₹28,45,300**). Ask me any question regarding your SIP goals, latest fraud blocks, or custom investment plans.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [isGeneratingChat, setIsGeneratingChat] = useState(false);
  const [isRefreshingInsights, setIsRefreshingInsights] = useState(false);

  // Formats currency nicely in INR
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Run initial AI insights generation on login (if api keys exist)
  useEffect(() => {
    if (isAuthenticated) {
      triggerInsightsAudit();
    }
  }, [isAuthenticated]);

  // Handle outgoing messages
  const handleSendMessage = async (text: string) => {
    // Add User Message
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toISOString(),
    };

    const updatedHistory = [...chatMessages, userMsg];
    setChatMessages(updatedHistory);
    setIsGeneratingChat(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: updatedHistory }),
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: data.reply || "I apologize, but I encountered a secure gateway synchronization timeout.",
        timestamp: new Date().toISOString(),
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      // Fallback message
      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: "assistant",
        text: "Gateway timeout. Running in offline secure sandbox mode. I am fully capable of processing your offline local inputs.",
        timestamp: new Date().toISOString(),
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsGeneratingChat(false);
    }
  };

  // Trigger server-side insights audit
  const triggerInsightsAudit = async () => {
    setIsRefreshingInsights(true);
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionHistory: transactions, userProfile }),
      });
      const data = await response.json();
      if (data.insights && Array.isArray(data.insights) && data.insights.length > 0) {
        setInsights(data.insights);
      }
    } catch (err) {
      console.error("Failed to generate AI insights:", err);
    } finally {
      setIsRefreshingInsights(false);
    }
  };

  // Resolve fraud alert
  const handleResolveAlert = (id: string) => {
    setFraudAlerts((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, isResolved: true } : alert))
    );
  };

  // Add Savings Target
  const handleAddGoal = (goal: SavingsGoal) => {
    setSavingsGoals((prev) => [goal, ...prev]);
  };

  // Update Savings Goal Current Progress
  const handleUpdateGoalProgress = (id: string, newAmount: number) => {
    setSavingsGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, currentAmount: newAmount } : goal))
    );
  };

  // Apply for recommended SBI Product
  const handleApplyProduct = (productName: string) => {
    alert(`Thank you for choosing SBI Aurum Wealth. Your application for "${productName}" has been validated and passed to your local branch advisor for instant processing!`);
  };

  // Clear conversation state
  const handleClearHistory = () => {
    setChatMessages([
      {
        id: "welcome-msg",
        sender: "assistant",
        text: "Private session refreshed. Ask me any question regarding your investment plans or savings targets.",
        timestamp: new Date().toISOString()
      }
    ]);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* SBI Premium Wealth Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-950 text-white border-b border-sky-950/20 px-6 py-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Landmark className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight">SBI NeoAgent</h1>
                <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Autonomous AI FRM
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">State Bank of India Private Wealth</p>
            </div>
          </div>

          {/* Right User Tier Account Info */}
          <div className="flex items-center gap-5">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white flex items-center justify-end gap-1.5">
                <Sparkle className="h-3.5 w-3.5 text-sky-400 fill-sky-400" />
                {userProfile.name}
              </p>
              <p className="text-[10px] text-sky-300 font-semibold">{userProfile.tier}</p>
            </div>
            
            {/* User Avatar */}
            <img
              src={userProfile.avatarUrl}
              alt="Aditya"
              className="h-10 w-10 rounded-xl border border-sky-500/20 object-cover shadow-sm"
            />

            {/* Logout button */}
            <button
              onClick={() => setIsAuthenticated(false)}
              className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-colors cursor-pointer border border-white/5"
              title="Secure Logout Session"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto w-full flex-1 px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left/Middle Content Segment - 2 columns on desktop */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Responsive Navigation Buttons Row */}
          <div className="bg-white border border-slate-100 p-1.5 rounded-2xl shadow-xs flex flex-wrap gap-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "dashboard" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "analytics" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              Spending Analytics
            </button>
            <button
              onClick={() => setActiveTab("goals")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "goals" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Coins className="h-4 w-4" />
              Savings Planner
            </button>
            <button
              onClick={() => setActiveTab("fraud")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "fraud" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Fraud Shield
            </button>
            <button
              onClick={() => setActiveTab("products")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "products" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              SBI Recommendations
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              className={`text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer transition-all ${
                activeTab === "transactions" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <History className="h-4 w-4" />
              Ledger
            </button>
          </div>

          {/* Core Tab switching display rendering */}
          <div className="transition-all duration-300">
            {activeTab === "dashboard" && (
              <FinancialHealthDashboard
                user={userProfile}
                onAuditClick={() => {
                  setActiveTab("insights");
                  triggerInsightsAudit();
                }}
                onGoToTab={(tab) => setActiveTab(tab)}
              />
            )}
            
            {activeTab === "analytics" && (
              <SpendingAnalytics transactions={transactions} />
            )}

            {activeTab === "goals" && (
              <SavingsGoalPlanner
                goals={savingsGoals}
                onAddGoal={handleAddGoal}
                onUpdateGoalProgress={handleUpdateGoalProgress}
              />
            )}

            {activeTab === "fraud" && (
              <FraudDetectionDashboard
                alerts={fraudAlerts}
                onResolveAlert={handleResolveAlert}
              />
            )}

            {activeTab === "products" && (
              <ProductRecommendations
                products={recommendations}
                onApply={handleApplyProduct}
              />
            )}

            {activeTab === "transactions" && (
              <TransactionHistory transactions={transactions} />
            )}

            {activeTab === "insights" && (
              <InsightsPanel
                insights={insights}
                isLoading={isRefreshingInsights}
                onRefresh={triggerInsightsAudit}
              />
            )}
          </div>

          {/* Secondary segment block: AI Insights list preview (Only shown on dashboard) */}
          {activeTab === "dashboard" && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Active Financial Audits</h3>
                  <p className="text-xs text-slate-400">Proactive optimizations crafted by SBI NeoAgent</p>
                </div>
                <button
                  onClick={() => setActiveTab("insights")}
                  className="text-xs text-sky-600 hover:text-sky-700 font-semibold cursor-pointer"
                >
                  View All Audits &rarr;
                </button>
              </div>

              <div className="space-y-4">
                {insights.slice(0, 2).map((ins) => (
                  <div key={ins.id} className="border border-slate-100 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded uppercase font-semibold">
                          {ins.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{ins.date}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1">{ins.title}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ins.description}</p>
                    </div>
                    {ins.impactValue && (
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-slate-400 uppercase font-bold block">Target Optimization</span>
                        <span className="text-xs font-extrabold text-slate-800">{ins.impactValue}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Content Column - AI Chatbot Panel */}
        <div className="space-y-6">
          
          {/* Quick wealth statistics summary card */}
          <div className="bg-gradient-to-br from-slate-900 to-sky-950 rounded-2xl p-5 shadow-md text-white flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <p className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">
                Authorized SBI Wealth Profile
              </p>
              <h3 className="text-lg font-bold mt-1">
                Aditya Vardhan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Client ID: SBI-940285-AM
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Portfolio</span>
              <span className="text-lg font-mono font-bold text-white">{formatCurrency(userProfile.netWorth)}</span>
            </div>
          </div>

          <ChatAssistant
            messages={chatMessages}
            onSendMessage={handleSendMessage}
            onClearHistory={handleClearHistory}
            isGenerating={isGeneratingChat}
          />
        </div>

      </main>

      {/* Corporate footer */}
      <footer className="bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 mt-auto">
        <p className="font-semibold uppercase tracking-wider text-[10px] text-slate-500">State Bank of India Private Wealth Management</p>
        <p className="mt-1">Secured and tokenized using Google Gemini enterprise compliance protocols. Registered with SEBI under Indian Finance Code regulations.</p>
      </footer>

    </div>
  );
}
