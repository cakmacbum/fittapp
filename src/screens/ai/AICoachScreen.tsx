import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import ProGuard from '../../components/ProGuard';
import { Send, Loader2, Bot } from 'lucide-react';

export default function AICoachScreen() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Merhaba! Ben FitApp AI Koçun. Bugün antrenmanınla veya beslenmenle ilgili sana nasıl yardımcı olabilirim?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const mockContext = { name: 'Yusuf', level: 'Orta', currentStreak: 5 };
      const apiMessages = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      
      const response = await aiService.chatWithCoach(apiMessages, mockContext);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Hata: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Neden ilerleme duraksadı?",
    "Deload gerekli mi?",
    "Formumu nasıl düzeltirim?"
  ];

  return (
    <ProGuard>
      <div className="flex flex-col h-full min-h-screen bg-slate-50">
        <div className="bg-white p-4 border-b border-slate-200 flex items-center gap-3 shadow-sm z-10 sticky top-0">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full">
            <Bot size={20} />
          </div>
          <div>
            <h2 className="font-black text-slate-800">AI Koç</h2>
            <p className="text-xs font-medium text-green-500">Çevrimiçi</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span className="text-xs text-slate-500 font-medium">Koç yazıyor...</span>
              </div>
            </div>
          )}

          {messages.length === 1 && !loading && (
            <div className="pt-4 flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => sendMessage(q)}
                  className="bg-slate-200/50 hover:bg-slate-200 text-slate-600 text-xs font-bold py-2 px-4 rounded-full transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Mesaj gönder..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-400 outline-none transition"
              disabled={loading}
            />
            <button 
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </ProGuard>
  );
}
