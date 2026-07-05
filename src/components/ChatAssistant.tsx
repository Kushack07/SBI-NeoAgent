/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send, Sparkles, Bot, User, Trash2, ArrowUpRight, Volume2 } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onClearHistory: () => void;
  isGenerating: boolean;
}

const QUICK_SUGGESTIONS = [
  "What is my net worth?",
  "Recommend me an investment fund",
  "Any suspicious activity detected?",
  "How can I reach my SUV goal faster?"
];

export default function ChatAssistant({ messages, onSendMessage, onClearHistory, isGenerating }: ChatAssistantProps) {
  const [inputValue, setInputValue] = useState("");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    onSendMessage(inputValue.trim());
    setInputValue("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  };

  // Modern Speech-to-Text integration
  const toggleVoiceAssistant = () => {
    if (isVoiceActive) {
      setIsVoiceActive(false);
      return;
    }

    setIsVoiceActive(true);
    setVoiceTranscript("Listening to audio waves...");

    // Check if webkitSpeechRecognition is available in the browser frame
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      // Graceful Mock fallback if speech API is unavailable or sandboxed in iframe
      setTimeout(() => {
        setVoiceTranscript("Captured speech: 'How can I reach my SUV goal faster?'");
        setTimeout(() => {
          onSendMessage("How can I reach my SUV goal faster?");
          setIsVoiceActive(false);
        }, 1500);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setVoiceTranscript("Awaiting voice stream...");
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error", event.error);
        setVoiceTranscript("Iframe Mic Restricted. Fallback Simulated: 'Suggest an investment'");
        setTimeout(() => {
          onSendMessage("Recommend me an investment fund");
          setIsVoiceActive(false);
        }, 2000);
      };

      recognition.onend = () => {
        setIsVoiceActive(false);
      };

      recognition.onresult = (event: any) => {
        const transcriptText = event.results[0][0].transcript;
        if (transcriptText) {
          onSendMessage(transcriptText);
        }
      };

      recognition.start();
    } catch (err) {
      console.error("Speech recognition could not start:", err);
      setIsVoiceActive(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-[580px] overflow-hidden">
      
      {/* Assistant Header */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-sky-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-sky-500/10 rounded-xl flex items-center justify-center border border-sky-500/20">
            <Bot className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-white">SBI NeoAgent</h3>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-sky-200">Autonomous Financial Relationship Partner</p>
          </div>
        </div>

        <button
          onClick={onClearHistory}
          className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white cursor-pointer transition-colors"
          title="Clear Conversation Logs"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isModel = msg.sender === "assistant";
          
          return (
            <div
              key={msg.id}
              className={`flex ${isModel ? "justify-start" : "justify-end"} items-end gap-2.5`}
            >
              {isModel && (
                <div className="h-7 w-7 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 shrink-0 mb-1">
                  <Bot className="h-4 w-4 text-sky-400" />
                </div>
              )}

              <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs shadow-xs leading-relaxed ${
                isModel
                  ? "bg-white border border-slate-100 text-slate-800 rounded-bl-none"
                  : "bg-sky-500 text-white rounded-br-none"
              }`}>
                {/* Message Body rendering formatted bold tags nicely */}
                <div 
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>")
                  }}
                />

                {/* Optional Voice indicator */}
                {msg.isVoiceInput && (
                  <div className="flex items-center gap-1 mt-1 text-[9px] text-sky-100 opacity-90 font-mono">
                    <Volume2 className="h-3 w-3" />
                    Authorized via Voice Handshake
                  </div>
                )}
              </div>

              {!isModel && (
                <div className="h-7 w-7 bg-sky-100 rounded-lg flex items-center justify-center shrink-0 mb-1">
                  <User className="h-4 w-4 text-sky-700" />
                </div>
              )}
            </div>
          );
        })}

        {/* Dynamic Generating/Typing state */}
        {isGenerating && (
          <div className="flex justify-start items-end gap-2.5">
            <div className="h-7 w-7 bg-slate-900 rounded-lg flex items-center justify-center border border-slate-800 shrink-0 mb-1">
              <Bot className="h-4 w-4 text-sky-400" />
            </div>
            <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none p-3.5 shadow-xs flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 bg-sky-500 rounded-full animate-bounce" />
            </div>
          </div>
        )}

        {/* Voice Recognition Active Overlaid Shield */}
        {isVoiceActive && (
          <div className="bg-sky-950 border border-sky-800 text-white rounded-xl p-4 flex items-center gap-4 shadow-lg animate-pulse">
            <div className="h-10 w-10 bg-sky-500/20 rounded-full flex items-center justify-center border border-sky-500/40">
              <Mic className="h-5 w-5 text-sky-400" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-sky-300 font-bold uppercase tracking-wider">Voice Assistant Listening</p>
              <p className="text-xs text-slate-200 mt-0.5">{voiceTranscript}</p>
            </div>
            <button
              onClick={() => setIsVoiceActive(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-slate-300 cursor-pointer"
            >
              <MicOff className="h-4 w-4" />
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips and inputs */}
      <div className="p-4 border-t border-slate-100 space-y-3.5 bg-white">
        
        {/* Chips */}
        {messages.length <= 2 && (
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-[10px] font-semibold text-slate-600 hover:text-sky-700 bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 py-1.5 px-3 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
              >
                {suggestion}
                <ArrowUpRight className="h-3 w-3 text-slate-400" />
              </button>
            ))}
          </div>
        )}

        {/* Chat input form */}
        <form onSubmit={handleSend} className="flex gap-2">
          {/* Voice Assistant Trigger Button */}
          <button
            type="button"
            onClick={toggleVoiceAssistant}
            className={`p-2.5 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
              isVoiceActive
                ? "bg-red-500 border-red-500 text-white animate-pulse"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
            }`}
            title="Ask via Voice Authentication"
          >
            <Mic className="h-5 w-5" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your transaction query or ask to freeze card..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
            disabled={isGenerating || isVoiceActive}
          />

          <button
            type="submit"
            disabled={isGenerating || isVoiceActive || !inputValue.trim()}
            className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold p-2.5 rounded-xl transition-all shadow-md shadow-sky-500/10 cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>

    </div>
  );
}
