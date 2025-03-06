import { useState } from "react";
import './index.css';  // Import the CSS file where you included Tailwind CSS

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import { Card } from './components/ui/card'; // Adjust the relative path as needed
import { CardContent} from './components/ui/card'; // Adjust the relative path as needed
import { Button } from './components/ui/button';
import { Header } from './components/ui/Header'; // Adjust the relative path as needed
 // Adjust the relative path as needed
import HealthForm from './components/ui/HealthForm';

export default function Chatbot() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");
  const questions = [
    
{key: "EducationLevel", text: "What is your educational background? None; High School; Bachelors; Higher"},
{key: "BMI", text: "What is your body mass index? Choose one: Underweight (<18.5); Heavy Weight (18.5-24.9); Overweight (25-29.9); Obese (30-40)"},
{key:"ExerciseHours", text: "Weekly physical activity in hours, ranging from 0 to 10"},
{key:"SleepHours", text:"How many hours of peaceful sleep do you have every night (on average)? Enter a number 0-10."},
{key:"FamilyHistoryAlzheimersYN", text:"Do you have a family history of Alzheimer's?"},
{key:"CardiovascularDiseaseYN", text:"Do you have cardiovascular disease?"},
{key:"DiabetesYN", text:"Do you have diabetes?"},
{key:"HeadInjuryYN", text:"Have you had a sever head injury ever in your life?"},
{key:"HypertensionYN", text:"Do you have high blood pressure (hypertension)?"},
{key:"CholesterolLDL", text:"LDL (Bad Cholesterol) level in mg/dL: Optimal (<100); Near Optimal (100-129); Borderline (130-159); High (160-189); Very High (190 or higher)"},
{key:"CholesterolHDL", "text": "HDL (Good Cholesterol) level in mg/dL: Optimal (men: 60 or higher; women: 70 or higher); Borderline (men: 41-59; women: 51-69); Low (men: 40 or less; women: 50 or less)"},
{key:"MemoryComplaintsYN","text":"Do you have difficulty remembering? E.g. remembering recent events, misplacing items, getting lost in familiar places"},
{key:"ADL","text": "Do you have difficulty carrying out everyday tasks like eating, dressing, bathing? Choose: Never; Sometimes; Often; Severe"}
  ];
  const [chat, setChat] = useState([
    { text: "Hello! I'm here to help you assess your Alzheimer's risk based on your lifestyle.", sender: "bot" },
    { text: questions[0].text, sender: "bot" }
  ]);

  const handleSend = () => {
    if (!input.trim() && step !== questions.length - 1) return; // Skip if input is empty
    const currentQuestionKey = questions[step].key; // 
    const updatedResponses = { ...responses, [currentQuestionKey]: input };
    setResponses(updatedResponses);
    setChat([...chat, { text: input, sender: "user" }]);
    setInput("");

    if (step < questions.length - 1) {
      setTimeout(() => {
        setChat([...chat, { text: input, sender: "user" }, { text: questions[step + 1].text, sender: "bot" }]);
        setStep(step + 1);
      }, 500);
    } else {
      submitData(updatedResponses);
    }
  };

  const submitData = async (data) => {
    setChat([...chat, { text: "Processing your inputs...", sender: "bot" }]);
    console.log(data);
    const response = await fetch("https://your-api.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    setChat([...chat, { text: `Prediction: ${result.prediction}`, sender: "bot" }]);
  };


  return (
    
    <div className="w-screen h-screen flex">
    {/* Sidebar Navigation */}
    <div className="w-1/4 h-full bg-gray-800 text-white p-5 flex flex-col">
      <Header title="Alzheimer Predictor" />
      <h2 className="text-lg font-semibold mt-5">Menu</h2>
      <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/">Chat</Link>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/HealthForm">HealthForm</Link>
          </li>
          <li className="hover:bg-gray-700 p-2 rounded">
            <Link to="/help">Help</Link>
          </li>
        </ul>
    </div>
   
    {/* Chat Interface */}
    <div className="flex-1 p-5 bg-gray-100">
      <Card className="w-full h-full p-6 shadow-2xl rounded-2xl overflow-auto bg-white flex flex-col">
     
        <CardContent className="space-y-5 flex-1 overflow-auto">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/Health" element={<HealthForm />} />
          </Routes>
        </BrowserRouter>
          {chat.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                {msg.sender === "bot" ? "🤖" : "👤"}
              </div>
              <div className={msg.sender === "bot" ? "text-left" : "text-right text-blue-600"}>{msg.text}</div>
            </div>
          ))}
        </CardContent>
        <div className="flex gap-2 p-2 border-t">
          <input
            className="flex-1 p-2 border rounded"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your answer..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} disabled={step >= questions.length}>Send</Button>
        </div>
      </Card>
    </div>
  </div>
  
  );
}
