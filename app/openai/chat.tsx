'use client'
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/openai-chat'
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-4">
        <ul className="space-y-4 mb-4">
          {messages.map((m, index) => (
            <li key={index} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
              {m.content}
            </li>
          ))}
        </ul>
      
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <label className="flex-1">
            <input 
              value={input} 
              onChange={handleInputChange} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ask GPT something..."
            />
          </label>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
