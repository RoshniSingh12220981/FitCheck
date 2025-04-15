import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Progress() {
  const [progressData, setProgressData] = useState<any[]>([]);
  const [entry, setEntry] = useState({
    date: '',
    weight: '',
    calories: '',
    steps: '',
    diet: '',
    water: '',
    sleep: '',
    workout: '',
  });
  const [moodCalendar, setMoodCalendar] = useState<{ [key: number]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const addProgressEntry = (): void => {
    if (Object.values(entry).some((value) => !value)) {
      alert('Please fill all fields.');
      return;
    }

    const newEntry = {
      ...entry,
      id: Date.now(),
      bmi: (parseFloat(entry.weight) / 1.75 ** 2).toFixed(1),
    };

    setProgressData([newEntry, ...progressData]);
    setEntry({
      date: '',
      weight: '',
      calories: '',
      steps: '',
      diet: '',
      water: '',
      sleep: '',
      workout: '',
    });
  };

  const pieData = {
    labels: ['Diet', 'Water', 'Sleep', 'Workout'],
    datasets: [
      {
        data: ['diet', 'water', 'sleep', 'workout'].map((key) =>
          progressData.length
            ? parseFloat(
                (
                  progressData.reduce((acc, item) => acc + parseFloat(item[key]), 0) /
                  progressData.length
                ).toFixed(1)
              )
            : 0
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  const handleMoodClick = (day: number) => {
    const emoji = prompt('How was your day? 😊 (happy), 😐 (ok), 😞 (sad)');
    if (emoji) {
      setMoodCalendar({ ...moodCalendar, [day]: emoji });
    }
  };

  const getMoodColor = (emoji: string | undefined) => {
    if (emoji === '😊') return 'bg-yellow-300';
    if (emoji === '😐') return 'bg-green-300';
    if (emoji === '😞') return 'bg-red-300';
    return 'bg-white';
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-6 text-center">
        Progress Tracker
      </h1>

      {/* Add Progress Form */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Add Progress</h2>
        <div className="grid grid-cols-2 gap-4">
          {['date', 'weight', 'calories', 'steps', 'diet', 'water', 'sleep', 'workout'].map((field) => (
            <input
              key={field}
              type={field === 'date' ? 'date' : 'number'}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={entry[field as keyof typeof entry]}
              onChange={handleChange}
              className="p-3 border rounded-lg focus:ring focus:ring-indigo-400 bg-white shadow-sm"
            />
          ))}
        </div>
        <button
          onClick={addProgressEntry}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all"
        >
          Add Entry
        </button>
      </div>

      {/* Pie Chart */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Progress Overview</h2>
        <div className="w-3/4 mx-auto">
          <Pie data={pieData} />
        </div>
      </div>

      {/* Mood Calendar */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Mood Calendar</h2>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className={`p-4 border rounded-lg shadow-sm text-center cursor-pointer hover:bg-indigo-100 transition-all ${getMoodColor(moodCalendar[i + 1])}`}
              onClick={() => handleMoodClick(i + 1)}
            >
              {i + 1}
              <div className="mt-2 text-xl">{moodCalendar[i + 1]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-8 text-center text-gray-700">
        <p className="text-lg">
          This page helps you track your daily progress in terms of calories, steps,
          water intake, sleep, and workout. Use the mood calendar above to log your
          feelings and visualize progress with the chart.
        </p>
      </div>
    </div>
  );
}
