import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaHeartbeat, FaRunning, FaAppleAlt, FaChartLine } from 'react-icons/fa';

// Dashboard Component
export default function Dashboard() {
  // Access the authenticated user's information
  const { user } = useAuth();

  // State to track which feature card is currently active
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // List of features offered by the application
  const features = [
    {
      id: 1,
      icon: <FaRunning className="text-teal-600 text-3xl" />,
      title: 'Track Workouts',
      desc: 'Log your steps, runs, strength sessions, and daily physical activities in one place.',
      details: 'Track time, distance, pace, and calories burned across various exercises. Our smart tracker syncs with devices like smartwatches and fitness bands for real-time data collection.',
    },
    {
      id: 2,
      icon: <FaAppleAlt className="text-orange-500 text-3xl" />,
      title: 'Monitor Nutrition',
      desc: 'Track what you eat, monitor calories, macros, and make better food choices.',
      details: 'Use our food diary to log meals, scan barcodes, and track your daily intake of carbs, proteins, and fats. Receive healthy recipe suggestions and dietary tips.',
    },
    {
      id: 3,
      icon: <FaChartLine className="text-indigo-500 text-3xl" />,
      title: 'Visual Progress',
      desc: 'Understand your trends with interactive charts and visual graphs for weight, activity, and more.',
      details: 'Our progress tracker visualizes changes in your weight, body measurements, and workout intensity over time using elegant charts and graphs.',
    },
    {
      id: 4,
      icon: <FaHeartbeat className="text-rose-500 text-3xl" />,
      title: 'Stay Motivated',
      desc: 'Set personal goals and get helpful reminders to keep you consistent and motivated.',
      details: 'Set daily, weekly, or monthly fitness goals. Get automated reminders, personalized messages, and motivational quotes to keep your drive alive.',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10 space-y-10 border border-gray-200 animate-fade-in">
        
        {/* Header Section */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 animate-slide-up">
          Welcome, {user?.name || 'Fitness Enthusiast'}! 💪
        </h1>

        {/* Introduction Section */}
        <section className="text-center space-y-4 animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 flex justify-center items-center gap-3">
            <FaHeartbeat className="text-rose-600" />
            What is FitTrack?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            FitTrack is your personal fitness companion that helps you stay on top of your health goals.
            Whether you're looking to lose weight, gain muscle, or just stay active, we've got you covered.
          </p>
          <h2 className="text-2xl font-semibold text-gray-700 flex justify-center items-center gap-2 pt-6">
            <FaChartLine className="text-indigo-500" />
            How does it help you?
          </h2>
        </section>

        {/* Feature Flashcards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="relative bg-teal-100 p-6 h-48 rounded-xl shadow-md hover:shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 animate-zoom"
              onClick={() =>
                setActiveFeature(activeFeature === feature.id ? null : feature.id)
              }
            >
              {/* Feature Icon */}
              <div className="mb-8 flex justify-center">{feature.icon}</div>
              {/* Feature Title */}
              <h3 className="font-semibold text-gray-800">{feature.title}</h3>

              {/* Feature Description (Visible on Click) */}
              {activeFeature === feature.id && (
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-white border border-teal-200 shadow-lg rounded p-3 z-30 text-sm text-gray-600 animate-fade-in-up">
                  {feature.desc}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-300 my-6" />

        {/* Detailed Feature Descriptions */}
        <section className="space-y-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md animate-slide-up border border-gray-200"
            >
              {/* Feature Header */}
              <div className="flex items-center gap-3 mb-3">
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
              {/* Feature Details */}
              <p className="text-gray-600 leading-relaxed">{feature.details}</p>
            </div>
          ))}
        </section>

        {/* Call to Action Section */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold text-gray-800">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-gray-600 mt-2">Join thousands of users who are achieving their health goals with FitTrack.</p>
          <button className="mt-4 px-6 py-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition">
            Get Started Now
          </button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }
        .animate-zoom {
          animation: zoomIn 0.4s ease-out;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        @keyframes zoomIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeInUp {
          0% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Footer Section */}
      <footer className="mt-12 text-center text-gray-500 text-sm space-y-2">
        <p>&copy; {new Date().getFullYear()} FitTrack. All rights reserved.</p>
        <p>
          Built with <span className="text-rose-500">&hearts;</span> by <strong>Roshni Singh Ranjan</strong>
        </p>
        <p>
          📍 Ranchi, Jharkhand 834009; | &nbsp; 📞 <a href="tel:+91XXXXXXXXXX" className="text-blue-500 hover:underline">+91-70618182XX</a>
        </p>
        <p>
          🔗 <a href="https://github.com/RoshniSingh12220981" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            GitHub Profile
          </a>
        </p>
      </footer>
    </main>
  );
}