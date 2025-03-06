import React, { useState } from 'react';

const HealthForm = () => {
  const [formData, setFormData] = useState({
    EducationLevel: 0,
    BMI: 0,
    ExerciseHours: 0,
    SleepHours: 0,
    FamilyHistoryAlzheimersYN: 0,
    CardiovascularDiseaseYN: 0,
    DiabetesYN: 0,
    HeadInjuryYN: 0,
    HypertensionYN: 0,
    CholesterolLDL: 0,
    CholesterolHDL: 0,
    MemoryComplaintsYN: 0,
    ADL: 0
  });

  const [chat, setChat] = useState([
    { text: "Welcome to Alzheimer disease assessment.", sender: "bot" }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChat([...chat, { text: "Processing your inputs...", sender: "bot" }]);
    console.log(formData);
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    
    const result = await response.json();    
    
    setChat([{ text: `Prediction of having Alzheimer's: ${result.risk}`, sender: "bot" }, 
      { text: `Analysis: ${result.analysis}`, sender: "bot" }]);

  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white shadow-md rounded-lg">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">What is your educational background?</label>
          <select name="EducationLevel" value={formData.EducationLevel} onChange={handleChange} className="p-2 border rounded">
            <option value="0">Select</option>
            <option value="0">None</option>
            <option value="1">High School</option>
            <option value="2">Bachelors</option>
            <option value="3">Higher</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">What is your body mass index?</label>
          <select name="BMI" value={formData.BMI} onChange={handleChange} className="p-2 border rounded">
            <option value="0">Select</option>
            <option value="17">Underweight (&lt;18.5)</option>
            <option value="21">Heavy Weight (18.5-24.9)</option>
            <option value="27">Overweight (25-29.9)</option>
            <option value="35">Obese (30-40)</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Weekly physical activity in hours:</label>
          <input type="number" name="ExerciseHours" min="0" max="10" value={formData.ExerciseHours} onChange={handleChange} className="p-2 border rounded" />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">How many hours of peaceful sleep do you have every night (on average)?</label>
          <input type="number" name="SleepHours" min="0" max="10" value={formData.SleepHours} onChange={handleChange} className="p-2 border rounded" />
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="FamilyHistoryAlzheimersYN" checked={formData.FamilyHistoryAlzheimersYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Do you have a family history of Alzheimer's?</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="CardiovascularDiseaseYN" checked={formData.CardiovascularDiseaseYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Do you have cardiovascular disease?</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="DiabetesYN" checked={formData.DiabetesYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Do you have DiabetesYN?</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="HeadInjuryYN" checked={formData.HeadInjuryYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Have you had a severe head injury ever in your life?</label>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="HypertensionYN" checked={formData.HypertensionYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Do you have high blood pressure (hypertension)?</label>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">LDL (Bad Cholesterol) level in mg/dL:</label>
          <select name="CholesterolLDL" value={formData.CholesterolLDL} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select</option>
            <option value="90">&lt;100</option>
            <option value="120">100-129</option>
            <option value="145">130-159</option>
            <option value="175">160-189</option>
            <option value="195">&gt;190</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">HDL (Good Cholesterol) level in mg/dL:</label>
          <select name="CholesterolHDL" value={formData.CholesterolHDL} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select</option>
            <option value="40">Optimal (men: &gt;60; women: &gt;70)</option>
            <option value="55">Borderline (men: 41-59; women: 51-69)</option>
            <option value="65">Low (men: &lt;40; women: &lt;50)</option>
          </select>
        </div>

        <div className="flex items-center">
          <input type="checkbox" name="MemoryComplaintsYN" checked={formData.MemoryComplaintsYN} onChange={handleChange} className="mr-2" />
          <label className="font-semibold">Do you have difficulty remembering? (e.g., remembering recent events, misplacing items, getting lost in familiar places)</label>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Do you have difficulty carrying out everyday tasks like eating, dressing, bathing?</label>
          <select name="ADL" value={formData.ADL} onChange={handleChange} className="p-2 border rounded">
            <option value="">Select</option>
            <option value="1">Never</option>
            <option value="4">Sometimes</option>
            <option value="7">Often</option>
            <option value="10">Severe</option>
          </select>
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
      </form>

      <div className="mt-6">
        {chat.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-2">
              {msg.sender === "bot" ? "🤖" : "👤"}
            </div>
            <div className={msg.sender === "bot" ? "text-left" : "text-right text-blue-600"}>{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthForm;