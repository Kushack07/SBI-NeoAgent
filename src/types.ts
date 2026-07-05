/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  email: string;
  accountNumber: string;
  tier: string; // e.g., "SBI Elite Premium", "SBI Wealth"
  avatarUrl?: string;
  netWorth: number;
  savingsRate: number;
  creditScore: number;
  monthlyIncome: number;
  monthlySpending: number;
}

export interface HealthMetric {
  title: string;
  value: number;
  maxValue: number;
  status: "excellent" | "good" | "fair" | "critical";
  description: string;
}

export enum TransactionCategory {
  FOOD_DINING = "Food & Dining",
  UTILITIES_BILLS = "Utilities & Bills",
  TRAVEL_TRANSPORT = "Travel & Transport",
  SHOPPING_LIFESTYLE = "Shopping & Lifestyle",
  INVESTMENTS = "Investments",
  HEALTHCARE = "Healthcare",
  OTHERS = "Others"
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  type: "debit" | "credit";
  category: TransactionCategory;
  status: "completed" | "pending" | "flagged";
  location: string;
  riskScore: number; // 0 to 100
  paymentMethod: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  monthlyContribution: number;
  category: string;
  color: string; // Tailwind color class
}

export interface FraudAlert {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
  merchant: string;
  amount: number;
  location: string;
  isResolved: boolean;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  type: "card" | "investment" | "loan" | "insurance";
  description: string;
  features: string[];
  rewardRate?: string;
  interestRate?: string;
  suitabilityScore: number; // 0 to 100
  aiReasoning: string;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestions?: string[];
  isVoiceInput?: boolean;
}

export interface InsightItem {
  id: string;
  type: "warning" | "opportunity" | "tip" | "milestone";
  title: string;
  description: string;
  impactValue?: string;
  category: string;
  date: string;
}
