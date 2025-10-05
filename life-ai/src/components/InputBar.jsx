export default function InputBar ( { input, setInput, handleSend }) {
  return (
      <input
        type="text"
        className="flex-1 rounded-md px-3 py-2
                  text-sm font-medium text-gray-700 
                  border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-200
                  transition-colors duration-150"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
          }}}
      />
  );
}