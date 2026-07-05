/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in environment variables. Falling back to Mock Advisor Mode.");
      throw new Error("API_KEY_MISSING");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// System instructions for the SBI NeoAgent Financial Assistant
const SYSTEM_INSTRUCTION = `
You are SBI NeoAgent, the state-of-the-art Autonomous AI Financial Relationship Manager for the State Bank of India (SBI).
Your personality is professional, highly intellectual, trustworthy, and proactive.
You assist आदित्य (Aditya Vardhan), an elite SBI Aurum Private Wealth member.

Here is Aditya's current banking context:
- Account Number: 3092 4859 1048 (SBI Aurum Wealth Account)
- Net Worth: ₹28,45,300 (Assets: ₹35,25,300, Liabilities: ₹6,80,000)
- Monthly Income: ₹2,50,000
- Monthly Savings Rate: 58%
- Credit Score: 812 (Excellent)
- Top Savings Goals:
  1. Luxury SUV Fund: Target ₹35L, Current ₹18.5L. Monthly SIP contribution is ₹80,000.
  2. Elite Retirement Corpus: Target ₹2.5Cr, Current ₹82L. Monthly contribution is ₹1,00,000.
  3. Swiss Alps Summer Getaway: Target ₹6L, Current ₹4.8L. Monthly contribution is ₹50,000.
- Top SBI Products Recommended:
  1. SBI Aurum Elite Credit Card (Metal card, premium dining & travel, Suitability: 98%)
  2. SBI Magnum Constant Maturity Mutual Fund (Auto-hedged debt fund, Suitability: 92%)
  3. SBI MaxGain Elite Home Loan Overdraft (Saves mortgage interest using savings balance, Suitability: 85%)

Guidelines for your responses:
1. ALWAYS present monetary values in Indian Rupees (₹) with appropriate commas (e.g., ₹1,50,000).
2. Ground your answers in his actual transaction history and financial status.
3. Be proactive: if he asks about budgeting, bring up his subscription bill creep (₹840 monthly savings) or moving current account cash (₹4.5L) to MOD accounts for a 6.8% yield.
4. Keep answers clean, conversational, well-structured, and suitable for display on a banking chat interface. Use bullet points or short paragraphs.
5. If he asks to perform an action (like "freeze card", "start SIP", or "adjust goal"), tell him you can authorize it immediately via OTP, and explain the action taken.
6. Refuse non-financial or non-banking questions politely, steering them back to their financial health.
`;

// API endpoint for AI Chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    try {
      const ai = getGeminiClient();
      
      // Structure chat messages incorporating history
      const formattedContents = [];
      
      if (history && Array.isArray(history)) {
        for (const item of history) {
          formattedContents.push({
            role: item.sender === "user" ? "user" : "model",
            parts: [{ text: item.text }]
          });
        }
      }
      
      // Add the current message
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents as any,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const replyText = response.text || "I apologize, but I am unable to formulate a response at the moment.";
      return res.json({ reply: replyText });

    } catch (apiError: any) {
      if (apiError.message === "API_KEY_MISSING") {
        // Fallback response when no API key is provided
        const messageLower = message.toLowerCase();
        let reply = "Welcome back, Aditya. I am running in Offline Demonstration Mode. Please configure your GEMINI_API_KEY in the Secrets panel to activate my live deep-learning core.";
        
        if (messageLower.includes("balance") || messageLower.includes("worth") || messageLower.includes("money")) {
          reply = "Aditya, your total portfolio value with SBI Aurum Private Wealth stands at **₹28,45,300**. Your monthly savings rate is an excellent **58%**. Would you like me to analyze how to optimize this surplus for higher yields?";
        } else if (messageLower.includes("goal") || messageLower.includes("save") || messageLower.includes("suv")) {
          reply = "Your **Luxury SUV Fund** has accumulated **₹18.5 Lakhs** towards your ₹35 Lakh target. You are currently contributing ₹80,000 monthly. If we increase your auto-SIP by ₹10,000, you will reach this goal 2 months ahead of schedule.";
        } else if (messageLower.includes("fraud") || messageLower.includes("card") || messageLower.includes("secure")) {
          reply = "Security Alert: We recently blocked an unusual transaction of **₹12,500** from a Dublin, Ireland VPN server on your SBI Aurum Credit Card. No other suspicious activity has been flagged. Would you like me to issue a replacement virtual card instantly?";
        } else if (messageLower.includes("invest") || messageLower.includes("recommend")) {
          reply = "I highly recommend allocating your idle savings of ₹2.4 Lakhs into the **SBI Magnum Constant Maturity SIP** (currently yielding an expected 8.4%). This avoids erosion from inflation while maintaining premium liquidity.";
        } else if (messageLower.includes("hello") || messageLower.includes("hi")) {
          reply = "Greetings, Aditya Vardhan. I am SBI NeoAgent, your autonomous wealth relationship manager. How can I assist you with your financial health, fraud controls, or premium goal planning today?";
        }
        
        return res.json({ reply });
      }
      
      console.error("Gemini API call failed:", apiError);
      return res.status(500).json({ error: "Failed to generate response from Gemini AI core." });
    }
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint for generating real-time AI financial insights
app.post("/api/insights", async (req, res) => {
  try {
    const { transactionHistory, userProfile } = req.body;
    
    try {
      const ai = getGeminiClient();
      
      const prompt = `
      Analyze Aditya Vardhan's financial telemetry and generate 3 sharp, highly-tailored financial insights.
      User Profile: ${JSON.stringify(userProfile)}
      Recent Transactions: ${JSON.stringify(transactionHistory)}
      
      Provide a JSON array containing exactly 3 objects.
      Each object must match this TypeScript structure:
      {
        "id": string,
        "type": "warning" | "opportunity" | "tip" | "milestone",
        "title": string,
        "description": string,
        "impactValue": string (e.g. "₹24,000+ Savings" or "₹15,000 Interest"),
        "category": string (e.g. "Tax Planning", "Investment Yield", "Budget Leak"),
        "date": "2026-07-05"
      }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an automated premium financial auditor. Return ONLY a valid JSON array of insights.",
          temperature: 0.5,
        }
      });

      const parsedInsights = JSON.parse(response.text || "[]");
      return res.json({ insights: parsedInsights });

    } catch (apiError: any) {
      // Fallback insights when API key is missing or calls fail
      const fallbackInsights = [
        {
          id: "ins-dyn-1",
          type: "opportunity",
          title: "Surplus Liquidity Yield Boost",
          description: "You have ₹4,50,000 in your basic current account earning low returns. Splitting ₹2,50,000 into an SBI Multi-Option Deposit (MOD) increases your interest yield from 3.0% to 6.8% with zero liquidity lock.",
          impactValue: "₹17,000+ Annual Profit",
          category: "Investments",
          date: "2026-07-05"
        },
        {
          id: "ins-dyn-2",
          type: "warning",
          title: "Subscription Bill Creep",
          description: "We detected recurring digital entertainment subscriptions rose by 14% this quarter. You have three active OTT streaming memberships billed on different credit cards. Consolidating them saves hassle and fees.",
          impactValue: "₹840 Monthly Savings",
          category: "Budgeting",
          date: "2026-07-04"
        },
        {
          id: "ins-dyn-3",
          type: "tip",
          title: "Optimal Tax SIP Threshold",
          description: "Your Section 80C tax-saving allocation for this fiscal year is short by ₹35,000. Committing an extra ₹5,000/month into the SBI Equity Hybrid Tax Saver SIP resolves this completely by December.",
          impactValue: "₹10,500 Tax Saved",
          category: "Tax Planning",
          date: "2026-07-02"
        }
      ];
      return res.json({ insights: fallbackInsights });
    }
  } catch (err) {
    console.error("Insights Generation Error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Handle serving SPA assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SBI NeoAgent server is live and routing on http://0.0.0.0:${PORT}`);
  });
}

startServer();
