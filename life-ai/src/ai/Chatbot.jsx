import { useState } from 'react';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [gameStats, setGameStats] = useState({
    money: 100,
    happiness: 50,
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];

    // Simulate bot response and stat changes
    const botReply = {
      role: 'bot',
      content: `You said: "${input}". Here's a tip: stay happy!`,
    };

    const updatedStats = {
      money: gameStats.money + Math.floor(Math.random() * 10),
      happiness: gameStats.happiness + Math.floor(Math.random() * 5),
    };

    setMessages([...newMessages, botReply]);
    setGameStats(updatedStats);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Game Stats */}
      <div className="bg-gray-100 p-4 flex justify-between text-sm font-medium">
        <div>💰 Money: ${gameStats.money}</div>
        <div>😊 Happiness: {gameStats.happiness}</div>
      </div>

      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === 'user' ? 'bg-blue-200 self-end ml-auto' : 'bg-green-200 self-start'
            }`}
          >
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit()}}

        />
        <button type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}