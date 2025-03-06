import { useState } from "react";
import './index.css';  // Import the CSS file where you included Tailwind CSS

import { Card } from './components/ui/card'; // Adjust the relative path as needed
import {CardContent} from './components/ui/card'; // Adjust the relative path as needed
import { Button } from './components/ui/button';
import { Header } from './components/ui/Header'; // Adjust the relative path as needed

export default function Chatbot() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");
  const questions = [
    "How many hours do you exercise per week?",
    "On a scale of 1-10, how would you rate your diet quality?",
    "How many hours do you sleep on average per night?",
    "How often do you engage in social activities (e.g., meet friends, community events)? (Daily/Weekly/Rarely)",
    "Do you regularly engage in cognitive activities (e.g., puzzles, reading, learning) Check the box for 'Yes'?"
  ];
  const [chat, setChat] = useState([
    { text: "Hello! I'm here to help you assess your Alzheimer's risk based on your lifestyle.", sender: "bot" },
    { text: questions[0], sender: "bot" }
  ]);

  const handleSend = () => {
    if (!input.trim() && step !== questions.length - 1) return;
    const updatedResponses = { ...responses, [step]: input };
    setResponses(updatedResponses);
    setChat([...chat, { text: input, sender: "user" }]);
    setInput("");

    if (step < questions.length - 1) {
      setTimeout(() => {
        setChat([...chat, { text: input, sender: "user" }, { text: questions[step + 1], sender: "bot" }]);
        setStep(step + 1);
      }, 500);
    } else {
      submitData(updatedResponses);
    }
  };

  const submitData = async (data) => {
    setChat([...chat, { text: "Processing your inputs...", sender: "bot" }]);
    const response = await fetch("https://your-api.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    setChat([...chat, { text: `Prediction: ${result.prediction}`, sender: "bot" }]);
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center p-5 bg-gray-100">
      <Card className="w-3/4 md:w-2/3 lg:w-1/2 h-3/4 p-6 shadow-2xl rounded-2xl overflow-auto bg-white">      
        <Header></Header><div></div>
        <CardContent className="space-y-5">
          {chat.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                {msg.sender === "bot" ? "🤖" : "👤"}
              </div>
              <div className={msg.sender === "bot" ? "text-left" : "text-right text-blue-600"}>{msg.text}</div>
            </div>
          ))}
          {step < questions.length } 
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
            
          
          <Button onClick={handleSend} disabled={step >= questions.length}>
            Send
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
