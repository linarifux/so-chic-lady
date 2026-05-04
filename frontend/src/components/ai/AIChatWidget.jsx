import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { useSendChatMessageMutation } from '../../store/slices/aiApiSlice';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Bonjour ! Je suis votre styliste personnelle So Chic Lady. Comment puis-je vous aider à trouver la tenue parfaite aujourd\'hui ? 🎀' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  // --- REDUX RTK QUERY MUTATION ---
  const [sendMessage, { isLoading }] = useSendChatMessageMutation();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    
    // Add user message to UI immediately
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    setInputMessage('');

    try {
      // Call backend endpoint using Redux RTK Query (.unwrap() extracts the payload)
      const data = await sendMessage({ message: userText }).unwrap();

      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: data.reply }
      ]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: "Oups, un petit souci de connexion. Réessayez dans un instant ! ✨" }
      ]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-22 right-7 sm:bottom-24 sm:right-8 z-50 p-4 bg-black text-white rounded-full shadow-xl hover:shadow-2xl hover:bg-[#E5A3B8] hover:text-black hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
        >
          <Sparkles size={24} className="group-hover:animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      <div 
        className={`fixed bottom-22 right-7 sm:bottom-24 sm:right-8 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden transform transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom-right
        ${isOpen ? 'scale-100 opacity-100 h-[550px]' : 'scale-0 opacity-0 h-0 pointer-events-none'}`}
      >
        
        {/* Chat Header */}
        <div className="bg-black p-4 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 text-white">
            <div className="w-8 h-8 rounded-full bg-[#333333] flex items-center justify-center border border-gray-700">
              <Sparkles size={16} className="text-[#E5A3B8]" />
            </div>
            <div>
              <h3 className="font-serif font-medium text-base tracking-wide leading-tight">IA Styliste</h3>
              <p className="text-[10px] text-[#E5A3B8] uppercase tracking-widest font-medium">So Chic Lady</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#FAFAFA]">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-black text-white rounded-br-sm' 
                  : 'bg-white border border-gray-100 text-gray-700 rounded-bl-sm'
              }`}>
                {/* Simple render to handle Gemini's potential asterisks/markdown gracefully */}
                <span dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm p-4 flex gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Je cherche une robe pour un mariage..."
            className="flex-1 py-3 px-4 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-black text-white rounded-full hover:bg-[#E5A3B8] hover:text-black disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-white transition-colors shrink-0"
          >
            <Send size={18} className="ml-0.5" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIChatWidget;