import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Chatbot from './components/ui/Chatbot';
import HealthForm from './components/ui/HealthForm';
import {Header} from './components/ui/Header';

export default function App() {
  return (
    <BrowserRouter>
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
              <Link to="/HealthForm">Health Form</Link>
            </li>
            <li className="hover:bg-gray-700 p-2 rounded">
              <Link to="/help">Help</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 bg-gray-100">
          <Routes>
            <Route path="/" element={<Chatbot />} />
            <Route path="/HealthForm" element={<HealthForm />} />
            <Route path="/help" element={<div>Help Page</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}