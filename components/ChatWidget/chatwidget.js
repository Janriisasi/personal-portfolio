import { useState, useRef, useEffect } from "react";
import { Howl } from "howler";
import { motion, AnimatePresence } from "framer-motion";

const popSound = new Howl({ src: ["/sounds/multi-pop.mp3"], volume: 0.5 });

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm John's AI assistant. Ask me anything about his projects, skills, or experience." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    popSound.play();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: data.content || "Sorry, I couldn't fetch a response." 
      }]);
    } catch (error) {
      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: "Something went wrong. Please try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

	return (
		<div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-mono">
		<AnimatePresence>
			{isOpen && (
			<motion.div
				initial={{ opacity: 0, y: 20, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				exit={{ opacity: 0, y: 20, scale: 0.95 }}
				transition={{ duration: 0.2 }}
				className="mb-4 w-[90vw] md:w-[22rem] h-[30rem] bg-black/80 backdrop-blur-md border border-indigo-dark/50 rounded-2xl shadow-[0_0_15px_rgba(112,0,255,0.3)] flex flex-col overflow-hidden"
			>
				{/* Header */}
				<div className="p-4 bg-indigo-dark/20 border-b border-indigo-dark/30 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full bg-green animate-pulse" />
					<span className="text-white font-bold text-sm">John's AI Assistant</span>
				</div>
				<button onClick={toggleChat} className="text-gray-light-3 hover:text-white">
					✕
				</button>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-dark scrollbar-track-transparent">
				{messages.map((msg, idx) => (
					<div
					key={idx}
					className={`flex ${
						msg.role === "user" ? "justify-end" : "justify-start"
					}`}
					>
					<div
						className={`max-w-[80%] p-3 rounded-lg text-sm break-words overflow-wrap-anywhere ${
						msg.role === "user"
							? "bg-indigo-dark text-white rounded-br-none"
							: "bg-gray-dark-2 text-gray-light-1 border border-gray-dark-4 rounded-bl-none"
						}`}
					>
						<div className="whitespace-pre-wrap break-all">{msg.content}</div>
					</div>
					</div>
				))}
				{isLoading && (
					<div className="flex justify-start">
					<div className="bg-gray-dark-2 p-3 rounded-lg rounded-bl-none flex gap-1">
						<span className="w-2 h-2 bg-gray-light-3 rounded-full animate-bounce" />
						<span className="w-2 h-2 bg-gray-light-3 rounded-full animate-bounce delay-75" />
						<span className="w-2 h-2 bg-gray-light-3 rounded-full animate-bounce delay-150" />
					</div>
					</div>
				)}
				<div ref={messagesEndRef} />
				</div>

				{/* Input */}
				<form onSubmit={handleSubmit} className="p-3 border-t border-indigo-dark/30 bg-black/50">
				<div className="flex gap-2">
					<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Ask about my skills..."
					className="flex-1 bg-transparent border border-gray-dark-4 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-light transition-colors placeholder:text-gray-dark-4"
					/>
					<button
					type="submit"
					disabled={isLoading}
					className="bg-indigo-dark hover:bg-indigo-light text-white p-2 rounded-lg transition-colors disabled:opacity-50"
					>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/>
					</svg>
					</button>
				</div>
				</form>
			</motion.div>
			)}
		</AnimatePresence>

		{/* Floating Button */}
		<motion.button
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			onClick={toggleChat}
			className="w-14 h-14 rounded-full bg-indigo-dark flex items-center justify-center shadow-[0_0_20px_rgba(112,0,255,0.5)] border border-white/20"
		>
			{isOpen ? (
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
				<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
			) : (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-7 h-7 text-white"
			>
				<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
				/>
			</svg>
			)}
		</motion.button>
		</div>
	);
	};

export default ChatWidget;