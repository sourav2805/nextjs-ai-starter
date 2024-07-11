'use client';

import { useState } from 'react';
import { continueConversation, Message } from './actions';
import { readStreamableValue } from 'ai/rsc';

export default function Home() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 p-6 text-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ollama Chat</h1>
        <div className="space-y-4 mb-4">
          {conversation.map((message, index) => (
            <div key={index} className={`p-2 rounded ${message.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
              <strong>{message.role === 'user' ? 'User: ' : 'Assistant: '}</strong>
              {message.content}
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask Ollama something..."
          />
          <button
            onClick={async () => {
              const { messages, newMessage } = await continueConversation([
                ...conversation,
                { role: 'user', content: input },
              ]);

              let textContent = '';

              for await (const delta of readStreamableValue(newMessage)) {
                textContent = `${textContent}${delta}`;

                setConversation([
                  ...messages,
                  { role: 'assistant', content: textContent },
                ]);
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
