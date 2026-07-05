/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, Transaction, TransactionCategory, SavingsGoal, FraudAlert, ProductRecommendation, InsightItem } from "./types";

export const MOCK_USER: UserProfile = {
  name: "Aditya Vardhan",
  email: "neoagent@sbi.co.in",
  accountNumber: "3092 4859 1048",
  tier: "SBI Aurum Private Wealth",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  netWorth: 2845300,
  savingsRate: 58,
  creditScore: 812,
  monthlyIncome: 250000,
  monthlySpending: 105000,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-001",
    date: "2026-07-04T19:30:00-07:00",
    merchant: "Swiggy Limited",
    amount: 1450,
    type: "debit",
    category: TransactionCategory.FOOD_DINING,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 8,
    paymentMethod: "SBI Aurum Credit Card",
  },
  {
    id: "tx-002",
    date: "2026-07-03T11:15:00-07:00",
    merchant: "Reliance Digital",
    amount: 45000,
    type: "debit",
    category: TransactionCategory.SHOPPING_LIFESTYLE,
    status: "completed",
    location: "New Delhi, DL",
    riskScore: 12,
    paymentMethod: "SBI Net Banking",
  },
  {
    id: "tx-003",
    date: "2026-07-02T08:45:00-07:00",
    merchant: "Uber India",
    amount: 620,
    type: "debit",
    category: TransactionCategory.TRAVEL_TRANSPORT,
    status: "completed",
    location: "Bengaluru, KA",
    riskScore: 4,
    paymentMethod: "SBI Aurum Credit Card",
  },
  {
    id: "tx-004",
    date: "2026-07-01T23:10:00-07:00",
    merchant: "Ireland Dublin Server Corp",
    amount: 12500,
    type: "debit",
    category: TransactionCategory.OTHERS,
    status: "flagged",
    location: "Dublin, IE (Virtual)",
    riskScore: 88,
    paymentMethod: "SBI Aurum Credit Card",
  },
  {
    id: "tx-005",
    date: "2026-06-30T10:00:00-07:00",
    merchant: "Tata Power",
    amount: 4800,
    type: "debit",
    category: TransactionCategory.UTILITIES_BILLS,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 2,
    paymentMethod: "SBI Savings Account Direct Debit",
  },
  {
    id: "tx-006",
    date: "2026-06-28T14:30:00-07:00",
    merchant: "SBI Bluechip Mutual Fund",
    amount: 50000,
    type: "debit",
    category: TransactionCategory.INVESTMENTS,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 1,
    paymentMethod: "SBI Auto-SIP Debit",
  },
  {
    id: "tx-007",
    date: "2026-06-25T17:20:00-07:00",
    merchant: "Apollo Pharmacies",
    amount: 2100,
    type: "debit",
    category: TransactionCategory.HEALTHCARE,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 3,
    paymentMethod: "SBI Aurum Credit Card",
  },
  {
    id: "tx-008",
    date: "2026-06-25T01:15:00-07:00",
    merchant: "Zomato Premium",
    amount: 850,
    type: "debit",
    category: TransactionCategory.FOOD_DINING,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 7,
    paymentMethod: "SBI Aurum Credit Card",
  },
  {
    id: "tx-009",
    date: "2026-07-01T00:00:00-07:00",
    merchant: "Monthly Salary Credited",
    amount: 250000,
    type: "credit",
    category: TransactionCategory.OTHERS,
    status: "completed",
    location: "SBI Corporate Payroll",
    riskScore: 0,
    paymentMethod: "NEFT Inward Direct Deposit",
  },
  {
    id: "tx-010",
    date: "2026-06-20T12:00:00-07:00",
    merchant: "Indigo Airlines",
    amount: 14200,
    type: "debit",
    category: TransactionCategory.TRAVEL_TRANSPORT,
    status: "completed",
    location: "Mumbai, MH",
    riskScore: 9,
    paymentMethod: "SBI Aurum Credit Card",
  }
];

export const MOCK_SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: "goal-1",
    name: "Luxury SUV Fund",
    targetAmount: 3500000,
    currentAmount: 1850000,
    targetDate: "2027-12-31",
    monthlyContribution: 80000,
    category: "Automobile",
    color: "bg-blue-600",
  },
  {
    id: "goal-2",
    name: "Elite Retirement Corpus",
    targetAmount: 25000000,
    currentAmount: 8200000,
    targetDate: "2040-06-30",
    monthlyContribution: 100000,
    category: "Retirement",
    color: "bg-emerald-600",
  },
  {
    id: "goal-3",
    name: "Swiss Alps Summer Getaway",
    targetAmount: 600000,
    currentAmount: 480000,
    targetDate: "2026-08-15",
    monthlyContribution: 50000,
    category: "Travel",
    color: "bg-amber-500",
  }
];

export const MOCK_FRAUD_ALERTS: FraudAlert[] = [
  {
    id: "alert-1",
    title: "Unusual Cross-Border Charge Attempt",
    description: "An online checkout attempt of ₹12,500 was detected from a Dublin, Ireland VPN server.",
    timestamp: "2026-07-01T23:10:00-07:00",
    severity: "high",
    merchant: "Ireland Dublin Server Corp",
    amount: 12500,
    location: "Dublin, IE (Virtual)",
    isResolved: false,
  },
  {
    id: "alert-2",
    title: "Suspicious High-Frequency Small Debits",
    description: "Three consecutive sub-₹100 transactions within 20 seconds from an unverified point-of-sale in Pune.",
    timestamp: "2026-06-24T18:40:00-07:00",
    severity: "medium",
    merchant: "FastPay Retailers",
    amount: 95,
    location: "Pune, MH",
    isResolved: true,
  }
];

export const MOCK_RECOMMENDATIONS: ProductRecommendation[] = [
  {
    id: "prod-1",
    name: "SBI Aurum Elite Credit Card",
    type: "card",
    description: "The ultimate super-premium metal credit card crafted exclusively for high-net-worth individuals.",
    features: [
      "4 Reward Points per ₹150 spent on all travel and dining merchants",
      "Complimentary unlimited domestic and international airport lounge access",
      "Dedicated 24/7 global lifestyle concierge desk",
      "Annual fee waiver on ₹12 Lakh annual spend thresholds"
    ],
    rewardRate: "2.67% Base Reward Yield",
    suitabilityScore: 98,
    aiReasoning: "Based on your high dining/travel spending and average transaction ticket size of ₹8,000, upgrading to SBI Aurum unlocks ₹42,000 in additional annual reward value.",
    actionUrl: "Apply for SBI Aurum",
  },
  {
    id: "prod-2",
    name: "SBI Magnum Constant Maturity SIP",
    type: "investment",
    description: "A highly resilient debt mutual fund designed to capture consistent yield changes across medium-to-long terms.",
    features: [
      "Auto-hedged against standard stock market volatility cascades",
      "Consistent historical performance of 8.2% CAGR over 5 years",
      "Instant tax savings under Section 80C options"
    ],
    interestRate: "8.4% Expected Yield",
    suitabilityScore: 92,
    aiReasoning: "You have ₹2.4 Lakhs in cash sitting under-utilized in your premium savings account. Automating a dynamic SIP here maximizes yield while maintaining high liquidity.",
    actionUrl: "Initiate SIP Setup",
  },
  {
    id: "prod-3",
    name: "SBI MaxGain Elite Home Loan Overdraft",
    type: "loan",
    description: "An innovative home loan linking your savings balance directly to minimize aggregate mortgage interest.",
    features: [
      "Interest calculated solely on principal outstanding minus your daily savings account surplus",
      "Drawdown funds at zero-notice from the connected overdraft account",
      "Extremely competitive rates from 8.35% p.a."
    ],
    interestRate: "8.35% Base p.a.",
    suitabilityScore: 85,
    aiReasoning: "Since you park large liquidity buffers prior to milestone payouts, the MaxGain overdraft will reduce your aggregate home loan interest payments by an estimated ₹6,50,000 over 15 years.",
    actionUrl: "Check Overdraft Eligibility",
  }
];

export const MOCK_INSIGHTS: InsightItem[] = [
  {
    id: "ins-1",
    type: "opportunity",
    title: "Surplus Liquidity Yield Boost",
    description: "You have ₹4,50,000 in your basic current account earning low returns. Splitting ₹2,50,000 into an SBI Multi-Option Deposit (MOD) increases your interest yield from 3.0% to 6.8% with zero liquidity lock.",
    impactValue: "₹17,000+ Annual Profit",
    category: "Investments",
    date: "2026-07-05",
  },
  {
    id: "ins-2",
    type: "warning",
    title: "Subscription Bill Creep",
    description: "We detected recurring digital entertainment subscriptions rose by 14% this quarter. You have three active OTT streaming memberships billed on different credit cards. Consolidating them saves hassle and fees.",
    impactValue: "₹840 Monthly Savings",
    category: "Budgeting",
    date: "2026-07-04",
  },
  {
    id: "ins-3",
    type: "tip",
    title: "Optimal Tax SIP Threshold",
    description: "Your Section 80C tax-saving allocation for this fiscal year is short by ₹35,000. Committing an extra ₹5,000/month into the SBI Equity Hybrid Tax Saver SIP resolves this completely by December.",
    impactValue: "₹10,500 Tax Saved",
    category: "Tax Planning",
    date: "2026-07-02",
  }
];
