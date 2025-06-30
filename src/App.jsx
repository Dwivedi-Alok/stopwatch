import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setTime(prev => prev + 10);
      }, 10);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (ms) => {
    const getMs = `0${(ms % 1000) / 10}`.slice(-2);
    const seconds = Math.floor(ms / 1000);
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = Math.floor(seconds / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(minutes / 60)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}:${getMs}`;
  };

  const handleLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-[#12142a] to-gray-800 text-white p-6">
      <div className="relative w-[250px] h-[250px] drop-shadow-xl">
        <svg width="250" height="250">
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#2c2f3f"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="125"
            cy="125"
            r="100"
            stroke="#f59e0b"
            strokeWidth="8"
            fill="none"
            strokeDasharray={2 * Math.PI * 100}
            strokeDashoffset={(1 - ((time % 60000) / 60000)) * 2 * Math.PI * 100}
            transform="rotate(-90 125 125)"
            className="transition-all duration-75 ease-out"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl font-mono">
          {formatTime(time)}
        </div>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        {!running ? (
          <button onClick={() => setRunning(true)} className="bg-green-600 hover:bg-green-700 transition-all text-white px-5 py-2 rounded-xl font-semibold shadow-lg">Start</button>
        ) : (
          <button onClick={() => setRunning(false) } className="bg-red-600 hover:bg-red-700 transition-all text-white px-5 py-2 rounded-xl font-semibold shadow-lg">Stop</button>
        )}
        <button onClick={() => {setTime(0)}} className="bg-gray-700 hover:bg-gray-800 transition-all text-white px-5 py-2 rounded-xl font-semibold shadow-lg">Reset</button>
        <button onClick={handleLap} className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-2 rounded-xl font-semibold shadow-lg">Lap</button>
      </div>

      <div className="mt-8 w-full max-w-md bg-[#1f2235] rounded-2xl shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-2 text-center border-b border-gray-600 pb-2">Laps</h2>
        <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {laps.map((lap, index) => (
            <li key={index} className="bg-[#2a2d3e] px-4 py-2 rounded-md flex justify-between text-sm font-mono">
              <span>Lap {index + 1}</span>
              <span>{formatTime(lap)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
