import { useState, useEffect } from 'react';
import InputBar from './InputBar';

export default function Chatbot() {
  const [playerName, setPlayerName] = useState({ firstName: "John", lastName: "Doe" });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [gameStats, setGameStats] = useState({ money: 100, happiness: 50, health: 50 });
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState(null);

  // List of possible life event categories
  const lifeEventCategories = ['career', 'relationships', 'family', 'health', 'education', 'financial', 'adventure', 'miscellaneous'];

  // -----------------------------
  // Generate character on startup
  // -----------------------------
  useEffect(() => {
    const generateCharacter = async () => {
      setMessages([{ role: 'bot', content: 'We are generating your character...' }]);
      try {
        const res = await fetch('http://127.0.0.1:8000/generate_character', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: "any",
            gender: "any",
            starting_location: "any",
            nationality: "any",
            ethnicity: "any"
          })
        });
        const data = await res.json();
        setCharacter(data);

        const fullName = data.name.split(' ');
        setPlayerName({
          firstName: fullName[0] || "John",
          lastName: fullName[1] || "Doe"
        });

        const description = `
Gender: ${data.gender}
Age: ${data.age || data.current_age}
Nationality: ${data.nationality}
Ethnicity: ${data.ethnicity}
Starting Location: ${data.starting_location}
Personality: ${data.personality || 'N/A'}
Physical Traits: ${data.physical_traits?.join(', ') || 'N/A'}
Backstory: ${data.backstory || 'N/A'}

Possible life event categories:
- ${lifeEventCategories.join('\n- ')}
        `;

        setMessages([{ role: 'bot', content: description }]);
      } catch (err) {
        console.error('Error generating character:', err);
        setMessages([{ role: 'bot', content: 'Failed to generate character. Please refresh.' }]);
      } finally {
        setLoading(false);
      }
    };

    generateCharacter();
  }, []);

  // -----------------------------
  // Generate life event from backend using user input
  // -----------------------------
  const generateLifeEvent = async (userInput) => {
    if (!character) return;
    setLoading(true);
    setMessages(prev => [...prev, { role: 'bot', content: 'Generating life event...' }]);

    try {
      const res = await fetch('http://127.0.0.1:8000/generate_event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          character: character,
          category: userInput.trim() || 'general'
        })
      });

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.event }]);
    } catch (err) {
      console.error('Error generating life event:', err);
      setMessages(prev => [...prev, { role: 'bot', content: 'Failed to generate life event.' }]);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Handle user sending a message
  // -----------------------------
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');

    // Generate life event using user's input as category/prompt
    generateLifeEvent(userInput);
  };

  return (
    <div className="flex flex-col h-screen w-screen mx-auto shadow-lg rounded-l-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-100 p-4 flex justify-between items-center text-sm font-medium">
        <div className="text-xl">{playerName.firstName} {playerName.lastName}</div>
        <div className="flex flex-col text-xs text-right">
          <p>💰 Money: ${gameStats.money}</p>
        </div>
      </div>

      {/* Chat Display */}
      <div className="bg-white flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`block p-2 rounded-lg max-w-[80%] ${
              msg.role === 'user'
                ? 'self-end ml-auto bg-gradient-to-r from-blue-100 to-blue-300'
                : 'self-start bg-gradient-to-l from-green-100 to-green-200'
            }`}
          >
            <span className="font-bold text-black">
              {msg.role === 'user' ? 'You:' : '>'}
            </span>{' '}
            <span className="break-words whitespace-pre-wrap">{msg.content}</span>
          </div>
        ))}
        {loading && <div className="italic text-gray-500">Loading...</div>}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t flex gap-2 bg-white">
        <InputBar input={input} setInput={setInput} handleSend={handleSend} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
