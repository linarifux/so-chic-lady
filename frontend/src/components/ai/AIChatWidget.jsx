import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, User } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Bonjour ! Je suis votre styliste personnelle So Chic Lady. Comment puis-je vous aider à trouver la tenue parfaite aujourd\'hui ? 🎀' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', content: inputMessage }]);
    setInputMessage('');

    // Placeholder for backend API call
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: "C'est noté ! Je recherche dans notre collection les meilleures pièces pour vous..." }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-8 z-50 p-4 bg-gradient-to-r from-[#F8C8DC] to-[#E5A3B8] text-[#333333] rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center group"
        >
          <Sparkles size={28} className="group-hover:animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-4 sm:right-8 w-[90vw] sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100 overflow-hidden transform transition-all duration-300">
          
          {/* Chat Header */}
          <div className="bg-[#333333] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <Sparkles size={20} className="text-[#F8C8DC]" />
              <div>
                <h3 className="font-serif font-medium text-lg leading-tight">IA Styliste</h3>
                <p className="text-xs text-gray-300 font-light">En ligne</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#333333] text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 py-2 px-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#F8C8DC] transition-all"
            />
            <button 
              type="submit" 
              disabled={!inputMessage.trim()}
              className="p-2 bg-[#333333] text-white rounded-full hover:bg-black disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;