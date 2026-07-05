/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { ShieldAlert, CheckCircle, ShieldCheck, AlertTriangle, Radio, HelpCircle, Lock, Unlock, Eye } from "lucide-react";
import { motion } from "motion/react";
import { FraudAlert } from "../types";

interface FraudDetectionDashboardProps {
  alerts: FraudAlert[];
  onResolveAlert: (id: string) => void;
}

export default function FraudDetectionDashboard({ alerts, onResolveAlert }: FraudDetectionDashboardProps) {
  const [isCardFrozen, setIsCardFrozen] = useState(false);
  const [internationalTransactions, setInternationalTransactions] = useState(false);
  const [atmWithdrawals, setAtmWithdrawals] = useState(true);
  const [viewDetailsId, setViewDetailsId] = useState<string | null>(null);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleResolve = (id: string, merchant: string) => {
    onResolveAlert(id);
    alert(`Alert resolved. Security report filed for ${merchant}.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Columns - Security Actions & Shield Settings */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Active Security Alerts panel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-red-50 rounded-xl">
                <ShieldAlert className="h-5 w-5 text-red-600 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">Fraud Protection Audit</h3>
                <p className="text-xs text-slate-400">SBI Autonomous Neuro-Shield Monitoring</p>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-100">
              <ShieldCheck className="h-3.5 w-3.5" />
              Shield Integrity: High
            </span>
          </div>

          <div className="space-y-4">
            {alerts.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-100 rounded-xl">
                <ShieldCheck className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                <h4 className="text-sm font-semibold text-slate-900">No Pending Threat Alerts</h4>
                <p className="text-xs text-slate-400 mt-1">Your cards and account limits conform entirely to SBI safety baselines.</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const isHigh = alert.severity === "high";
                const isResolved = alert.isResolved;

                return (
                  <div
                    key={alert.id}
                    className={`border rounded-xl p-4 transition-all ${
                      isResolved
                        ? "border-slate-100 bg-slate-50/50"
                        : isHigh
                        ? "border-red-100 bg-red-50/10 hover:bg-red-50/20"
                        : "border-amber-100 bg-amber-50/10 hover:bg-amber-50/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <span className={`p-2 rounded-lg shrink-0 ${
                          isResolved
                            ? "bg-slate-100 text-slate-500"
                            : isHigh
                            ? "bg-red-100 text-red-600"
                            : "bg-amber-100 text-amber-600"
                        }`}>
                          {isResolved ? (
                            <CheckCircle className="h-4.5 w-4.5" />
                          ) : (
                            <AlertTriangle className="h-4.5 w-4.5" />
                          )}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-bold ${isResolved ? "text-slate-500 line-through" : "text-slate-900"}`}>
                              {alert.title}
                            </h4>
                            {!isResolved && (
                              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                                isHigh ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {alert.severity} Risk
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                            {alert.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-[10px] text-slate-400 font-mono">
                            <span>Merchant: <strong className="text-slate-600 font-sans">{alert.merchant}</strong></span>
                            <span>Amount: <strong className="text-slate-600 font-sans">{formatCurrency(alert.amount)}</strong></span>
                            <span>Region: <strong className="text-slate-600 font-sans">{alert.location}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 shrink-0 text-right">
                        <span className="text-[9px] text-slate-400 font-medium">
                          {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        
                        {!isResolved && (
                          <div className="flex gap-2 justify-end mt-1">
                            <button
                              onClick={() => handleResolve(alert.id, alert.merchant)}
                              className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1 px-3 rounded-lg cursor-pointer transition-all"
                            >
                              Authorize & Resolve
                            </button>
                            <button
                              onClick={() => setIsCardFrozen(true)}
                              className="text-[10px] bg-slate-900 hover:bg-slate-800 text-white font-bold py-1 px-3 rounded-lg cursor-pointer transition-all"
                            >
                              Freeze Card
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Dynamic Multi-Channel Controls panel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-1.5">SBI Private Wealth Channel Firewall</h3>
          <p className="text-xs text-slate-400 mb-6">Manage live payment limits and switch channels instantly to secure against brute-force checkout compromises.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control card 1 */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">Card Status</span>
                  {isCardFrozen ? (
                    <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase">FROZEN</span>
                  ) : (
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">ACTIVE</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Temporarily freeze your SBI Aurum metal card from authorizations.</p>
              </div>
              <button
                onClick={() => setIsCardFrozen(!isCardFrozen)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  isCardFrozen
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {isCardFrozen ? (
                  <>
                    <Unlock className="h-3.5 w-3.5" />
                    Unfreeze Card
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    Freeze Card
                  </>
                )}
              </button>
            </div>

            {/* Control card 2 */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">Cross-Border E-com</span>
                  {internationalTransactions ? (
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">ALLOWED</span>
                  ) : (
                    <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">BLOCKED</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Toggle international online transactions and multi-currency conversions.</p>
              </div>
              <button
                onClick={() => setInternationalTransactions(!internationalTransactions)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  internationalTransactions
                    ? "bg-amber-600 text-white hover:bg-amber-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {internationalTransactions ? "Disable Cross-Border" : "Enable Cross-Border"}
              </button>
            </div>

            {/* Control card 3 */}
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-800">ATM Withdrawals</span>
                  {atmWithdrawals ? (
                    <span className="text-[9px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">ENABLED</span>
                  ) : (
                    <span className="text-[9px] bg-slate-200 text-slate-600 font-bold px-2 py-0.5 rounded-full uppercase">BLOCKED</span>
                  )}
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed mb-4">Block magnetic stripe reading and chip pins for physical cash dispensers.</p>
              </div>
              <button
                onClick={() => setAtmWithdrawals(!atmWithdrawals)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  atmWithdrawals
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {atmWithdrawals ? "Block Cash Channels" : "Unblock Cash Channels"}
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Right Column - Threat Telemetry Signals */}
      <div className="space-y-6">
        
        {/* Real-time signals feed */}
        <div className="bg-slate-900 rounded-2xl p-6 shadow-md text-white">
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
              <Radio className="h-4 w-4 animate-pulse" />
              Threat Signals Telemetry
            </h4>
            <span className="text-[8px] bg-sky-500/10 text-sky-300 font-bold py-0.5 px-2 rounded-full border border-sky-500/20">
              Live Network
            </span>
          </div>

          <div className="space-y-4">
            
            {/* signal 1 */}
            <div className="flex items-start gap-2.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-slate-300 font-semibold">SSL Verification Status</p>
                <p className="text-[10px] text-slate-500">Perfect 256-bit SHA handshake with gateway server verified.</p>
              </div>
            </div>

            {/* signal 2 */}
            <div className="flex items-start gap-2.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-slate-300 font-semibold">IP Address Localization</p>
                <p className="text-[10px] text-slate-500">Device connection mapped to authorized Delhi home region subnet.</p>
              </div>
            </div>

            {/* signal 3 */}
            <div className="flex items-start gap-2.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-red-500 shrink-0 mt-1.5 animate-pulse" />
              <div>
                <p className="text-red-300 font-semibold">Virtual Location Detection</p>
                <p className="text-[10px] text-slate-500">Unusual Swiggy/Reliance online requests originated via cross-continent VPN routing.</p>
              </div>
            </div>

            {/* signal 4 */}
            <div className="flex items-start gap-2.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-slate-300 font-semibold">Biometric Authorization Match</p>
                <p className="text-[10px] text-slate-500">Facial scan validation matches current account holder Aditya Vardhan.</p>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Last Scanned: Just Now</span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              Encrypted Session
            </span>
          </div>
        </div>

        {/* FAQ box */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
            <HelpCircle className="h-4.5 w-4.5 text-slate-400" />
            Security FAQ
          </h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            SBI NeoAgent works autonomously to block malicious transactions before settlement. If you block or freeze a card, a dynamic virtual replacement is created instantly under your profile.
          </p>
        </div>

      </div>

    </div>
  );
}
