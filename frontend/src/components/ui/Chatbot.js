import React, { useState } from 'react';

const Chatbot = () => {
  const [chat, setChat] = useState([
    { text: "Hello! I'm here to help you with information on Alzheimer dementia, and Parkinson's disease. How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setChat([...chat, userMessage]);
    setInput("");

    // Call Gemini model
    const botResponse = await callGeminiModel(input);
    setChat([...chat, userMessage, { text: botResponse, sender: "bot" }]);
  };

  const callGeminiModel = async (userInput) => {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const apiUrl = 'https://api.gemini-model.com/v1/generate'; // Replace with the actual API URL

    const systemPrompt = `
    You are a knowledgeable assistant specializing in Alzheimer's prognosis, dementia, and Parkinson's disease. 
    Provide accurate information and helpful resources. Always be empathetic and supportive.
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: `${systemPrompt}\nUser: ${userInput}\nAssistant:`,
        max_tokens: 150, // Adjust the number of tokens as needed
        temperature: 0.7 // Adjust the temperature as needed
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].text.trim();
  };

  return (
    <div className="w-full h-full p-6 shadow-2xl rounded-2xl overflow-auto bg-white flex flex-col">
      <div className="space-y-5 flex-1 overflow-auto">
        {chat.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              {msg.sender === "bot" ? "🤖" : "👤"}
            </div>
            <div className={msg.sender === "bot" ? "text-left" : "text-right text-blue-600"}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 p-2 border-t">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;