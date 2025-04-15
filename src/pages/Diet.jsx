import React, { useState } from 'react';

export default function DietPlan() {
  const [userInfo, setUserInfo] = useState({ height: '', weight: '', age: '', gender: '' });
  const [activeTab, setActiveTab] = useState('veg');
  const [dietPlan, setDietPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setUserInfo({ height: '', weight: '', age: '', gender: '' });
    setDietPlan('');
  };

  const fetchDietPlan = async () => {
    const { height, weight, age, gender } = userInfo;
    if (!height || !weight || !age || !gender) {
      setDietPlan('❌ Please fill all fields to generate a diet plan.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay

      let plan = '';
      if (activeTab === 'veg') {
        plan = `🥗 **Veg Diet Plan** for ${gender}, ${age} yrs:
• Morning: Oats with fruits + almonds  
• Mid-morning: Coconut water + fruits  
• Lunch: Brown rice, dal, sabzi, salad  
• Snack: Buttermilk or green tea + roasted chana  
• Dinner: Multigrain roti, paneer sabzi, soup`;
      } else {
        plan = `🍗 **Non-Veg Diet Plan** for ${gender}, ${age} yrs:
• Morning: Boiled eggs + multigrain bread  
• Mid-morning: Apple or banana  
• Lunch: Grilled chicken, rice, sautéed veggies  
• Snack: Boiled eggs or yogurt  
• Dinner: Fish curry or chicken soup + salad`;
      }

      setDietPlan(plan);
    } catch (error) {
      setDietPlan('⚠️ Failed to generate diet plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) {
      setAiResponse('❌ Please enter a question.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: aiQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAiResponse(`🤖 AI Suggestion: ${data.suggestion}`);
    } catch (error) {
      console.error('Error fetching AI suggestion:', error);
      setAiResponse('⚠️ Failed to fetch AI suggestion. Please check your internet connection or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-lg border border-gray-200">
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
        🍽️ Personalized Diet Dashboard
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        <button
          className={`px-6 py-3 rounded-lg font-bold text-lg shadow-md hover:scale-105 transition-all ${
            activeTab === 'veg' ? 'bg-green-500 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveTab('veg')}
        >
          Veg Diet
        </button>
        <button
          className={`px-6 py-3 rounded-lg font-bold text-lg shadow-md hover:scale-105 transition-all ${
            activeTab === 'nonveg' ? 'bg-red-500 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveTab('nonveg')}
        >
          Non-Veg Diet
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input
          type="number"
          name="height"
          placeholder="Height (cm)"
          value={userInfo.height}
          onChange={handleChange}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight (kg)"
          value={userInfo.weight}
          onChange={handleChange}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={userInfo.age}
          onChange={handleChange}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        />
        <select
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
          className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex justify-between mb-6 text-sm">
        <button onClick={clearForm} className="text-red-600 font-semibold hover:underline">
          Clear Inputs
        </button>
        <span className="text-gray-500 italic">* Personalized via age & goals</span>
      </div>

      <button
        onClick={fetchDietPlan}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:scale-105 transition-all"
      >
        {loading ? 'Generating...' : 'Generate Diet Plan'}
      </button>

      {dietPlan && (
        <div className="mt-8 bg-indigo-50 p-6 rounded-xl shadow-inner text-indigo-800 whitespace-pre-line">
          <h2 className="text-xl font-bold mb-4 text-indigo-700">
            Your {activeTab === 'veg' ? 'Veg' : 'Non-Veg'} Diet Plan:
          </h2>
          <p className="text-lg">{dietPlan}</p>
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4">🤖 Ask AI About Your Diet</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Ask AI about your diet..."
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
          />
          <button
            onClick={handleAiQuery}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:scale-105 transition-all"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </div>
        {aiResponse && (
          <div className="bg-indigo-50 p-6 rounded-xl shadow-inner text-indigo-800">
            <p className="text-lg">{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
