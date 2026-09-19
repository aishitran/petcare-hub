import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { ChatMessage, UserConversation, ChatChannelType } from '../../types/chat';
import { 
  mockQuickPrompts, 
  mockUserConversations as initialUserConversations, 
  getSmartChatResponse, 
  getUserSimulatedReply 
} from '../../data/mockChatData';
import { 
  MessageSquare, 
  X, 
  Minus, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  ShieldCheck, 
  PhoneCall, 
  Heart, 
  Smile, 
  Clock,
  RotateCcw,
  CheckCheck,
  ChevronDown,
  ArrowLeft,
  Search,
  Users,
  Check,
  Phone
} from 'lucide-react';

export const FloatingChatWidget: React.FC = () => {
  const { language, t } = useLanguage();
  const { currentUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<ChatChannelType>('ASSISTANT');
  
  // Assistant Tab States
  const [assistantInput, setAssistantInput] = useState('');
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<ChatMessage[]>(() => {
    const isEn = language === 'en';
    return [
      {
        id: 'msg-init-1',
        sender: 'AGENT',
        text: isEn ? t('chat.welcome1') : 'Xin chào bạn! 🐾 Tôi là trợ lý tư vấn cộng đồng PetCare Hub.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        senderName: isEn ? 'PetCare Specialist' : 'Trợ lý Cứu hộ PetCare'
      },
      {
        id: 'msg-init-2',
        sender: 'AGENT',
        text: isEn ? t('chat.welcome2') : 'Tôi có thể hỗ trợ bạn tìm kiếm thú cưng nhận nuôi, hướng dẫn quy trình, tra cứu trạm cứu hộ khẩn cấp hoặc giải đáp thắc mắc về Quỹ Tiếp Sức Hạt. Bạn cần giúp gì ạ?',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        senderName: isEn ? 'PetCare Specialist' : 'Trợ lý Cứu hộ PetCare'
      }
    ];
  });

  // Direct User Messaging States
  const [userConversations, setUserConversations] = useState<UserConversation[]>(initialUserConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [directInput, setDirectInput] = useState('');
  const [isDirectTyping, setIsDirectTyping] = useState(false);
  const [convSearchQuery, setConvSearchQuery] = useState('');

  // Total unread messages across all tabs
  const totalUserUnread = userConversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const assistantEndRef = useRef<HTMLDivElement>(null);
  const directEndRef = useRef<HTMLDivElement>(null);
  const assistantInputRef = useRef<HTMLInputElement>(null);
  const directInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isOpen && !isMinimized) {
      if (activeTab === 'ASSISTANT') {
        assistantEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      } else if (selectedConversationId) {
        directEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [assistantMessages, userConversations, isOpen, isMinimized, activeTab, selectedConversationId]);

  // Focus input on open/tab change
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        if (activeTab === 'ASSISTANT') {
          assistantInputRef.current?.focus();
        } else if (selectedConversationId) {
          directInputRef.current?.focus();
        }
      }, 150);
    }
  }, [isOpen, isMinimized, activeTab, selectedConversationId]);

  // Handle Assistant Send
  const handleSendAssistant = (textToSend?: string) => {
    const text = (textToSend || assistantInput).trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text: text,
      timestamp: userTime,
      senderName: currentUser?.name || (language === 'en' ? 'You' : 'Bạn')
    };

    setAssistantMessages(prev => [...prev, userMsg]);
    if (!textToSend) setAssistantInput('');

    setIsAssistantTyping(true);
    setTimeout(() => {
      const responseText = getSmartChatResponse(text, language);
      const agentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const agentMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'AGENT',
        text: responseText,
        timestamp: agentTime,
        senderName: language === 'en' ? 'PetCare 24/7 AI' : 'Trợ lý Cứu hộ PetCare'
      };

      setAssistantMessages(prev => [...prev, agentMsg]);
      setIsAssistantTyping(false);
    }, 700);
  };

  // Handle Direct User Send
  const handleSendDirect = (textToSend?: string) => {
    if (!selectedConversationId) return;
    const text = (textToSend || directInput).trim();
    if (!text) return;

    const targetConv = userConversations.find(c => c.id === selectedConversationId);
    if (!targetConv) return;

    const userTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-direct-${Date.now()}`,
      sender: 'USER',
      senderId: currentUser?.id || 'user-1',
      text: text,
      timestamp: userTime,
      senderName: currentUser?.name || (language === 'en' ? 'You' : 'Bạn')
    };

    // Update conversation with user message
    setUserConversations(prev => prev.map(conv => {
      if (conv.id === selectedConversationId) {
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: userTime,
          messages: [...conv.messages, userMsg]
        };
      }
      return conv;
    }));

    if (!textToSend) setDirectInput('');

    // Simulate other user's reply
    setIsDirectTyping(true);
    setTimeout(() => {
      const replyText = getUserSimulatedReply(targetConv.targetUserName, text, language);
      const replyTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      const replyMsg: ChatMessage = {
        id: `msg-direct-${Date.now() + 1}`,
        sender: 'OTHER_USER',
        senderId: targetConv.targetUserId,
        text: replyText,
        timestamp: replyTime,
        senderName: targetConv.targetUserName,
        avatar: targetConv.targetUserAvatar
      };

      setUserConversations(prev => prev.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            lastMessage: replyText,
            lastMessageTime: replyTime,
            messages: [...conv.messages, replyMsg]
          };
        }
        return conv;
      }));

      setIsDirectTyping(false);
    }, 900);
  };

  const handleSelectConversation = (convId: string) => {
    setSelectedConversationId(convId);
    // Mark as read
    setUserConversations(prev => prev.map(c => c.id === convId ? { ...c, unreadCount: 0 } : c));
  };

  const handleAssistantQuickPrompt = (prompt: typeof mockQuickPrompts[0]) => {
    const isEn = language === 'en';
    const userPrompt = isEn ? prompt.promptEn : prompt.promptVi;
    handleSendAssistant(userPrompt);
  };

  const clearAssistantHistory = () => {
    const isEn = language === 'en';
    setAssistantMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'AGENT',
        text: isEn ? t('chat.welcome1') : 'Xin chào bạn! 🐾 Tôi là trợ lý tư vấn cộng đồng PetCare Hub.',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        senderName: isEn ? 'PetCare Specialist' : 'Trợ lý Cứu hộ PetCare'
      }
    ]);
  };

  const currentActiveConv = userConversations.find(c => c.id === selectedConversationId);

  const filteredConversations = userConversations.filter(c => {
    if (!convSearchQuery.trim()) return true;
    const q = convSearchQuery.toLowerCase();
    return (
      c.targetUserName.toLowerCase().includes(q) ||
      c.targetUserRole.toLowerCase().includes(q) ||
      (c.targetPetName && c.targetPetName.toLowerCase().includes(q)) ||
      c.lastMessage.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* 1. FLOATING CHAT BUTTON (BOTTOM RIGHT) */}
      {!isOpen && (
        <aside aria-label={t('chat.title')} className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 animate-bounce-subtle">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#d46b28] to-[#ba591a] hover:from-[#ba591a] hover:to-[#9c3810] text-white shadow-xl hover:shadow-2xl border border-[#f5b88c]/40 transition-all duration-200 transform hover:scale-105 cursor-pointer group select-none"
            aria-label={t('chat.floatingButton')}
          >
            <div className="relative">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-6 h-6 rounded-full object-cover ring-1 ring-white/60 shadow-xs" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 ring-2 ring-[#d46b28] animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
                <span>{t('chat.floatingButton')}</span>
              </span>
              <span className="text-[10px] text-amber-200 font-medium">
                {t('chat.statusOnline')}
              </span>
            </div>

            {totalUserUnread > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                {totalUserUnread}
              </span>
            )}
          </button>
        </aside>
      )}

      {/* 2. DUAL-MODE CHAT WINDOW / MODAL BOX */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isMinimized
              ? 'bottom-5 right-5 w-80 sm:w-96 rounded-2xl shadow-xl border border-[#efe2d3] dark:border-stone-800 bg-white dark:bg-stone-900'
              : 'bottom-3 right-3 sm:bottom-5 sm:right-5 w-[calc(100vw-24px)] sm:w-[430px] h-[600px] max-h-[88vh] rounded-3xl shadow-2xl border border-[#efe2d3] dark:border-stone-800 bg-[#faf4ee] dark:bg-stone-900 flex flex-col overflow-hidden text-left'
          }`}
        >
          {/* Main Top Header */}
          <div className="p-3 sm:p-3.5 bg-gradient-to-r from-[#d46b28] to-[#ba591a] text-white flex items-center justify-between gap-2 shrink-0 border-b border-[#ba591a]/40 shadow-xs">
            <div className="flex items-center gap-2">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-8 h-8 rounded-full object-cover ring-1 ring-white/60 shadow-xs" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  PetCare Hub Live
                </span>
                <span className="text-[10px] text-amber-200 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  {t('chat.statusOnline')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition cursor-pointer"
                title={t('chat.minimize')}
                aria-label={t('chat.minimize')}
              >
                <Minus className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/90 hover:text-white transition cursor-pointer"
                title={t('chat.close')}
                aria-label={t('chat.close')}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Window Content */}
          {!isMinimized && (
            <>
              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-[#fde2cd] dark:bg-stone-950 p-1 gap-1 border-b border-[#f0ceb2] dark:border-stone-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('ASSISTANT')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    activeTab === 'ASSISTANT'
                      ? 'bg-white dark:bg-stone-800 text-[#9c3810] dark:text-amber-300 shadow-xs'
                      : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200 hover:bg-white/50 dark:hover:bg-stone-850'
                  }`}
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>{t('chat.tabAssistant')}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('USER_DIRECT')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-bold transition relative cursor-pointer ${
                    activeTab === 'USER_DIRECT'
                      ? 'bg-white dark:bg-stone-800 text-[#9c3810] dark:text-amber-300 shadow-xs'
                      : 'text-[#665851] dark:text-stone-400 hover:text-[#2b2523] dark:hover:text-stone-200 hover:bg-white/50 dark:hover:bg-stone-850'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('chat.tabCommunity')}</span>
                  {totalUserUnread > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black">
                      {totalUserUnread}
                    </span>
                  )}
                </button>
              </div>

              {/* ========================================================================= */}
              {/* TAB 1: 24/7 AI RESCUE ASSISTANT */}
              {/* ========================================================================= */}
              {activeTab === 'ASSISTANT' && (
                <div className="flex-1 flex flex-col min-h-0 bg-[#faf4ee] dark:bg-stone-900">
                  {/* Assistant Message History */}
                  <div className="flex-1 p-3 sm:p-3.5 overflow-y-auto space-y-3">
                    {/* Non-Profit Trust Disclaimer Banner */}
                    <div className="p-2.5 rounded-2xl bg-[#fde2cd]/70 dark:bg-amber-950/40 border border-[#f0ceb2] dark:border-amber-900/40 text-[11px] text-[#665851] dark:text-stone-300 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#d46b28] dark:text-amber-400 shrink-0" />
                        <span><strong>{language === 'vi' ? 'Hỗ trợ Cứu hộ & Nhận nuôi:' : 'Rescue & Adoption Support:'}</strong> 24/7 phi lợi nhuận.</span>
                      </div>
                      <button
                        type="button"
                        onClick={clearAssistantHistory}
                        className="text-[10px] text-[#d46b28] dark:text-amber-400 hover:underline font-semibold shrink-0 cursor-pointer"
                        title={t('chat.clearChat')}
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Assistant Message List */}
                    {assistantMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2 text-xs ${
                          msg.sender === 'USER' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {msg.sender === 'AGENT' && (
                          <img src="/logo.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 shadow-2xs ring-1 ring-[#f5b88c]" />
                        )}

                        <div
                          className={`max-w-[84%] p-3 rounded-2xl space-y-1 shadow-2xs leading-relaxed ${
                            msg.sender === 'USER'
                              ? 'bg-[#d46b28] text-white rounded-tr-xs'
                              : 'bg-white dark:bg-stone-800 text-[#2b2523] dark:text-stone-100 border border-[#efe2d3] dark:border-stone-700 rounded-tl-xs'
                          }`}
                        >
                          {msg.senderName && msg.sender !== 'USER' && (
                            <div className="text-[10px] font-bold text-[#9c3810] dark:text-amber-400 flex items-center justify-between">
                              <span>{msg.senderName}</span>
                            </div>
                          )}

                          <div className="whitespace-pre-wrap font-normal">
                            {msg.text}
                          </div>

                          <div className={`text-[9px] flex items-center justify-end gap-1 ${
                            msg.sender === 'USER' ? 'text-amber-200/90' : 'text-stone-400'
                          }`}>
                            <span>{msg.timestamp}</span>
                            {msg.sender === 'USER' && <CheckCheck className="w-3 h-3" />}
                          </div>
                        </div>

                        {msg.sender === 'USER' && (
                          <div className="w-7 h-7 rounded-xl bg-[#2b2523] dark:bg-stone-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-2xs">
                            {currentUser?.avatar ? (
                              <img src={currentUser.avatar} alt="" className="w-full h-full object-cover rounded-xl" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isAssistantTyping && (
                      <div className="flex items-start gap-2 text-xs">
                        <img src="/logo.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 shadow-2xs ring-1 ring-[#f5b88c]" />
                        <div className="p-3 bg-white dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 rounded-2xl rounded-tl-xs shadow-2xs space-y-1">
                          <div className="flex items-center gap-1 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-[#d46b28] animate-bounce" />
                            <span className="w-2 h-2 rounded-full bg-[#d46b28] animate-bounce [animation-delay:0.2s]" />
                            <span className="w-2 h-2 rounded-full bg-[#d46b28] animate-bounce [animation-delay:0.4s]" />
                            <span className="ml-1 text-[10px]">{t('chat.typing')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={assistantEndRef} />
                  </div>

                  {/* Quick FAQ Prompts Carousel */}
                  <div className="p-2 bg-[#f6ece2] dark:bg-stone-950 border-t border-[#efe2d3] dark:border-stone-800 space-y-1 shrink-0 text-left">
                    <span className="text-[10px] font-bold text-[#665851] dark:text-stone-400 uppercase tracking-wider pl-1">
                      {t('chat.quickQuestionsTitle')}
                    </span>
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {mockQuickPrompts.map((qp) => (
                        <button
                          key={qp.id}
                          type="button"
                          onClick={() => handleAssistantQuickPrompt(qp)}
                          className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 border border-[#efe2d3] dark:border-stone-700 text-[11px] font-medium text-[#2b2523] dark:text-stone-200 hover:text-[#9c3810] dark:hover:text-amber-300 whitespace-nowrap transition shadow-2xs shrink-0 cursor-pointer"
                        >
                          {language === 'en' ? qp.titleEn : qp.titleVi}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Assistant Input Bar */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendAssistant();
                    }}
                    className="p-2.5 bg-white dark:bg-stone-900 border-t border-[#efe2d3] dark:border-stone-800 flex flex-col gap-1.5 shrink-0"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        ref={assistantInputRef}
                        type="text"
                        value={assistantInput}
                        onChange={(e) => setAssistantInput(e.target.value)}
                        placeholder={t('chat.inputPlaceholder')}
                        className="flex-1 px-3 py-2 rounded-xl bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 text-xs text-[#2b2523] dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d46b28] focus:bg-white dark:focus:bg-stone-800 transition"
                      />

                      <button
                        type="submit"
                        disabled={!assistantInput.trim()}
                        className={`p-2 rounded-xl transition shadow-xs flex items-center justify-center shrink-0 ${
                          assistantInput.trim()
                            ? 'bg-[#d46b28] hover:bg-[#ba591a] text-white cursor-pointer'
                            : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                        }`}
                        title={t('chat.sendBtn')}
                        aria-label={t('chat.sendBtn')}
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ========================================================================= */}
              {/* TAB 2: P2P DIRECT USER MESSAGING */}
              {/* ========================================================================= */}
              {activeTab === 'USER_DIRECT' && (
                <div className="flex-1 flex flex-col min-h-0 bg-[#faf4ee] dark:bg-stone-900">
                  
                  {/* VIEW A: CONVERSATION LIST */}
                  {!selectedConversationId ? (
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Search Bar */}
                      <div className="p-2.5 bg-[#f6ece2] dark:bg-stone-950 border-b border-[#efe2d3] dark:border-stone-800 shrink-0">
                        <div className="relative">
                          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="text"
                            value={convSearchQuery}
                            onChange={(e) => setConvSearchQuery(e.target.value)}
                            placeholder={t('chat.searchConversations')}
                            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 text-xs text-[#2b2523] dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d46b28]"
                          />
                        </div>
                      </div>

                      {/* Conversation Item List */}
                      <div className="flex-1 overflow-y-auto divide-y divide-[#efe2d3] dark:divide-stone-800 p-1.5">
                        {filteredConversations.length === 0 ? (
                          <div className="p-8 text-center text-xs text-[#665851] dark:text-stone-400">
                            {t('chat.noConversations')}
                          </div>
                        ) : (
                          filteredConversations.map((conv) => (
                            <div
                              key={conv.id}
                              onClick={() => handleSelectConversation(conv.id)}
                              className="p-2.5 rounded-2xl hover:bg-white dark:hover:bg-stone-800 border border-transparent hover:border-[#efe2d3] dark:hover:border-stone-700 transition-all cursor-pointer flex items-start gap-2.5 group"
                            >
                              {/* Avatar & Online Dot */}
                              <div className="relative shrink-0">
                                <img
                                  src={conv.targetUserAvatar}
                                  alt={conv.targetUserName}
                                  className="w-10 h-10 rounded-2xl object-cover ring-1 ring-[#efe2d3] dark:ring-stone-700 shadow-2xs"
                                />
                                {conv.isOnline && (
                                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-bold text-[#2b2523] dark:text-stone-100 truncate group-hover:text-[#9c3810] dark:group-hover:text-amber-400 transition">
                                    {conv.targetUserName}
                                  </span>
                                  <span className="text-[10px] text-stone-400 shrink-0">
                                    {conv.lastMessageTime}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="px-1.5 py-0.2 rounded bg-[#fde2cd] dark:bg-amber-950/70 text-[#9c3810] dark:text-amber-300 text-[9px] font-semibold truncate max-w-[170px]">
                                    {conv.targetUserRole}
                                  </span>
                                </div>

                                {conv.targetPetName && (
                                  <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-[#d46b28] dark:text-amber-400">
                                    <span>🐾</span>
                                    <span className="truncate">{conv.targetPetName}</span>
                                  </div>
                                )}

                                <p className="text-[11px] text-[#665851] dark:text-stone-400 truncate mt-1">
                                  {conv.lastMessage}
                                </p>
                              </div>

                              {/* Unread Badge */}
                              {conv.unreadCount > 0 && (
                                <div className="shrink-0 self-center">
                                  <span className="w-5 h-5 rounded-full bg-[#d46b28] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                                    {conv.unreadCount}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  ) : (
                    /* VIEW B: DIRECT CONVERSATION THREAD */
                    <div className="flex-1 flex flex-col min-h-0">
                      {/* Thread Top Bar */}
                      {currentActiveConv && (
                        <div className="p-2.5 bg-white dark:bg-stone-900 border-b border-[#efe2d3] dark:border-stone-800 flex items-center justify-between gap-2 shrink-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => setSelectedConversationId(null)}
                              className="p-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-[#665851] dark:text-stone-300 hover:text-[#2b2523] dark:hover:text-stone-100 transition cursor-pointer"
                              title={t('chat.backToList')}
                            >
                              <ArrowLeft className="w-4 h-4" />
                            </button>

                            <div className="relative shrink-0">
                              <img
                                src={currentActiveConv.targetUserAvatar}
                                alt={currentActiveConv.targetUserName}
                                className="w-8 h-8 rounded-xl object-cover ring-1 ring-[#efe2d3] dark:ring-stone-700 shadow-2xs"
                              />
                              {currentActiveConv.isOnline && (
                                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
                              )}
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-[#2b2523] dark:text-stone-100 truncate">
                                {currentActiveConv.targetUserName}
                              </span>
                              <span className="text-[10px] text-[#665851] dark:text-stone-400 truncate">
                                {currentActiveConv.isOnline ? t('chat.online') : t('chat.offline')} • {currentActiveConv.targetUserRole}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => alert(language === 'en' ? `Contacting ${currentActiveConv.targetUserName}...` : `Đang kết nối liên hệ trực tiếp tới ${currentActiveConv.targetUserName}...`)}
                              className="p-1.5 rounded-lg bg-[#fde2cd] dark:bg-amber-950/70 hover:bg-[#fcd4b4] text-[#d46b28] dark:text-amber-300 transition cursor-pointer"
                              title="Gọi nhanh"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Associated Pet Banner */}
                      {currentActiveConv?.targetPetName && (
                        <div className="px-3 py-1.5 bg-[#fde2cd]/60 dark:bg-amber-950/40 border-b border-[#f0ceb2] dark:border-amber-900/40 flex items-center gap-2 text-[11px] text-[#665851] dark:text-stone-300 shrink-0">
                          {currentActiveConv.targetPetAvatar && (
                            <img 
                              src={currentActiveConv.targetPetAvatar} 
                              alt="" 
                              className="w-5 h-5 rounded-md object-cover" 
                            />
                          )}
                          <span className="truncate">
                            <strong>{t('chat.discussingAbout')}</strong> {currentActiveConv.targetPetName}
                          </span>
                        </div>
                      )}

                      {/* Messages Feed */}
                      <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
                        {currentActiveConv?.messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex items-start gap-2 text-xs ${
                              msg.sender === 'USER' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {msg.sender === 'OTHER_USER' && (
                              <img
                                src={msg.avatar || currentActiveConv.targetUserAvatar}
                                alt=""
                                className="w-6 h-6 rounded-lg object-cover shrink-0 mt-0.5"
                              />
                            )}

                            <div
                              className={`max-w-[82%] p-2.5 rounded-2xl space-y-1 shadow-2xs leading-relaxed ${
                                msg.sender === 'USER'
                                  ? 'bg-[#d46b28] text-white rounded-tr-xs'
                                  : 'bg-white dark:bg-stone-800 text-[#2b2523] dark:text-stone-100 border border-[#efe2d3] dark:border-stone-700 rounded-tl-xs'
                              }`}
                            >
                              <div className="whitespace-pre-wrap font-normal">
                                {msg.text}
                              </div>

                              <div className={`text-[9px] flex items-center justify-end gap-1 ${
                                msg.sender === 'USER' ? 'text-amber-200/90' : 'text-stone-400'
                              }`}>
                                <span>{msg.timestamp}</span>
                                {msg.sender === 'USER' && <CheckCheck className="w-3 h-3" />}
                              </div>
                            </div>

                            {msg.sender === 'USER' && (
                              <div className="w-6 h-6 rounded-lg bg-[#2b2523] dark:bg-stone-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                                {currentUser?.avatar ? (
                                  <img src={currentUser.avatar} alt="" className="w-full h-full object-cover rounded-lg" />
                                ) : (
                                  <User className="w-3.5 h-3.5" />
                                )}
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Direct User Typing Indicator */}
                        {isDirectTyping && (
                          <div className="flex items-start gap-2 text-xs">
                            <img
                              src={currentActiveConv?.targetUserAvatar}
                              alt=""
                              className="w-6 h-6 rounded-lg object-cover shrink-0 mt-0.5"
                            />
                            <div className="p-2.5 bg-white dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 rounded-2xl rounded-tl-xs shadow-2xs">
                              <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d46b28] animate-bounce" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d46b28] animate-bounce [animation-delay:0.2s]" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#d46b28] animate-bounce [animation-delay:0.4s]" />
                                <span className="ml-1">{currentActiveConv?.targetUserName} {t('chat.typing')}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div ref={directEndRef} />
                      </div>

                      {/* Direct Quick Suggestions */}
                      <div className="px-2.5 py-1.5 bg-[#f6ece2] dark:bg-stone-950 border-t border-[#efe2d3] dark:border-stone-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
                        {[
                          language === 'en' ? 'When can I visit the shelter?' : 'Khi nào mình có thể qua thăm bé?',
                          language === 'en' ? 'Does the pet have vaccine records?' : 'Bé đã có sổ tiêm phòng chưa ạ?',
                          language === 'en' ? 'Thank you so much!' : 'Cảm ơn bạn nhiều nhé! ❤️'
                        ].map((suggestion, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendDirect(suggestion)}
                            className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-800 hover:bg-[#fde2cd] dark:hover:bg-stone-700 border border-[#efe2d3] dark:border-stone-700 text-[11px] font-medium text-[#2b2523] dark:text-stone-200 hover:text-[#9c3810] dark:hover:text-amber-300 whitespace-nowrap transition shadow-2xs shrink-0 cursor-pointer"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>

                      {/* Direct Message Input Bar */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendDirect();
                        }}
                        className="p-2.5 bg-white dark:bg-stone-900 border-t border-[#efe2d3] dark:border-stone-800 flex items-center gap-2 shrink-0"
                      >
                        <input
                          ref={directInputRef}
                          type="text"
                          value={directInput}
                          onChange={(e) => setDirectInput(e.target.value)}
                          placeholder={t('chat.inputDirectPlaceholder')}
                          className="flex-1 px-3 py-2 rounded-xl bg-[#faf4ee] dark:bg-stone-800 border border-[#efe2d3] dark:border-stone-700 text-xs text-[#2b2523] dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#d46b28] focus:bg-white dark:focus:bg-stone-800 transition"
                        />

                        <button
                          type="submit"
                          disabled={!directInput.trim()}
                          className={`p-2 rounded-xl transition shadow-xs flex items-center justify-center shrink-0 ${
                            directInput.trim()
                              ? 'bg-[#d46b28] hover:bg-[#ba591a] text-white cursor-pointer'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-400 cursor-not-allowed'
                          }`}
                          title={t('chat.sendBtn')}
                          aria-label={t('chat.sendBtn')}
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              )}
            </>
          )}

        </div>
      )}
    </>
  );
};
