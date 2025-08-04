import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#a855f7', '#fb923c', '#ffffff', '#c084fc', '#facc15', '#4ade80'];
const TIME_OPTIONS = ['15m', '30m', '24h', '7d', '30d', '90d'];

function HolderStatsCard({ contract, blockchain }) {
  const [holderData, setHolderData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState('7d');
  const [visibleLines, setVisibleLines] = useState({
    OneToken: true,
    TwoTokens: true,
    Whales: true,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/api/v2/nft/collection/holders?blockchain=${blockchain}&contract_address=${contract}&time_range=${selectedTime}`
      );
      const data = await res.json();
      setHolderData(data);
    } catch (err) {
      console.error('Failed to fetch holder data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) fetchData();
  }, [selectedTime]);

  const handleViewClick = () => {
    setVisible(true);
    if (!holderData) fetchData();
  };

  const toggleLine = (line) => {
    setVisibleLines((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  const distribution = holderData
    ? [
        { name: '1 Token', value: +holderData.holders_tokens_1 || 0 },
        { name: '2 Tokens', value: +holderData.holders_tokens_2 || 0 },
        { name: '3-5 Tokens', value: +holderData.holders_tokens_3_5 || 0 },
        { name: '6-9 Tokens', value: +holderData.holders_tokens_6_9 || 0 },
        { name: '10-15 Tokens', value: +holderData.holders_tokens_10_15 || 0 },
        { name: '25+ Tokens', value: +holderData.holders_tokens_25plus || 0 },
      ]
    : [];

  const trendData = holderData
    ? (holderData.block_dates || []).map((date, idx) => ({
        date,
        OneToken: holderData.holders_tokens_1_trend?.[idx] || 0,
        TwoTokens: holderData.holders_tokens_2_trend?.[idx] || 0,
        Whales: holderData.holders_tokens_25plus_trend?.[idx] || 0,
      }))
    : [];

  return (
    <div className="bg-gradient-to-br from-black to-gray-900 border border-purple-700 shadow-lg shadow-purple-900/50 rounded-2xl p-5 text-white backdrop-blur-md transition-all duration-300 hover:shadow-orange-600/30">
      <h2 className="text-xl font-bold text-purple-300 mb-4 tracking-wide neon-text">
        📦 Holder Distribution
      </h2>

      {!visible ? (
        <button
          onClick={handleViewClick}
          className="px-5 py-2 rounded-lg bg-gradient-to-tr from-purple-600 to-orange-500 text-white font-semibold shadow-md hover:shadow-orange-400/60 transition duration-300 hover:scale-105 animate-pulse"
        >
          View Stats
        </button>
      ) : loading ? (
        <p className="text-gray-300">Loading holder stats...</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedTime(option)}
                className={`px-3 py-1 rounded-lg text-sm font-semibold border ${
                  selectedTime === option
                    ? 'bg-purple-700 text-white border-purple-400'
                    : 'bg-gray-800 text-purple-300 border-gray-600 hover:bg-purple-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-4 text-sm">
            {Object.keys(visibleLines).map((line) => (
              <label key={line} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={visibleLines[line]}
                  onChange={() => toggleLine(line)}
                  className="accent-purple-500"
                />
                {line}
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" outerRadius={80}>
                  {distribution.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f1f1f", borderColor: "#a855f7", color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <XAxis dataKey="date" stroke="#a855f7" />
                <YAxis stroke="#fb923c" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f1f1f", borderColor: "#a855f7", color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                {visibleLines.OneToken && (
                  <Line type="monotone" dataKey="OneToken" stroke="#a855f7" strokeWidth={2} />
                )}
                {visibleLines.TwoTokens && (
                  <Line type="monotone" dataKey="TwoTokens" stroke="#fb923c" strokeWidth={2} />
                )}
                {visibleLines.Whales && (
                  <Line type="monotone" dataKey="Whales" stroke="#ffffff" strokeWidth={2} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <p className="text-sm text-gray-400 mt-4">
            <span className="text-purple-300">Total Holders:</span> {holderData.holders} |{' '}
            <span className="text-orange-400">Change:</span>{' '}
            {(+(holderData.holders_change || 0) * 100).toFixed(2)}%
          </p>
        </>
      )}
    </div>
  );
}

export default HolderStatsCard;
