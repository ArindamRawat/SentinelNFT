import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

const TrendGraph = ({ contractAddress, chainId }) => {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('24h');
  const [visibleLines, setVisibleLines] = useState({
    assets: true,
    transactions: true,
    transfers: true,
    volume: true,
  });

  const fetchTrendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/api/v2/nft/collection/trend', {
        params: {
          blockchain: chainId || 'ethereum',
          contract_address: contractAddress,
          time_range: timeRange,
        },
      });

      const analytics = response.data?.data?.[0];

      if (
        !analytics ||
        !Array.isArray(analytics.block_dates)
      ) {
        throw new Error('Malformed analytics trend data');
      }

      const trend = analytics.block_dates.map((date, index) => ({
        time: date,
        assets: analytics.assets_trend?.[index] ?? 0,
        transactions: analytics.transactions_trend?.[index] ?? 0,
        transfers: analytics.transfers_trend?.[index] ?? 0,
        volume: analytics.volume_trend?.[index] ?? 0,
      }));

      setTrendData(trend);
    } catch (err) {
      console.error('Error fetching trend data:', err);
      setError('Failed to load trend data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showGraph) fetchTrendData();
  }, [timeRange]);

  const handleViewClick = () => {
    setShowGraph(true);
    if (!trendData.length) fetchTrendData();
  };

  const toggleLine = (key) => {
    setVisibleLines((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const timeRanges = ['15m', '30m', '24h', '7d', '30d', '90d'];

  return (
    <div className="bg-black rounded-2xl shadow-md border border-purple-800 p-5 text-white backdrop-blur-md">
      <h2 className="text-xl font-semibold text-purple-400 mb-4 glow-purple">📈 Collection Trend</h2>

      {!showGraph ? (
        <button
          onClick={handleViewClick}
          className="px-5 py-2 rounded-lg font-semibold text-black bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 hover:opacity-90 shadow-lg neon-border transition-all duration-300"
        >
          View Trend Graph
        </button>
      ) : (
        <>
          {/* Time Range Selector */}
          <div className="flex gap-2 flex-wrap mb-4">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  timeRange === range ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Line Toggle Buttons */}
          <div className="flex gap-4 mb-4 text-sm">
            {Object.keys(visibleLines).map((line) => (
              <label key={line} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={visibleLines[line]}
                  onChange={() => toggleLine(line)}
                  className="accent-purple-500"
                />
                {line.charAt(0).toUpperCase() + line.slice(1)}
              </label>
            ))}
          </div>

          {loading ? (
            <p className="text-gray-400">Loading trend data...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <XAxis
                    dataKey="time"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    stroke="#aaa"
                  />
                  <YAxis stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #6a0dad',
                      borderRadius: '10px',
                    }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ color: '#fff' }} />
                  {visibleLines.assets && (
                    <Line type="monotone" dataKey="assets" stroke="#d946ef" strokeWidth={2} dot={{ r: 2 }} />
                  )}
                  {visibleLines.transactions && (
                    <Line type="monotone" dataKey="transactions" stroke="#22d3ee" strokeWidth={2} dot={{ r: 2 }} />
                  )}
                  {visibleLines.transfers && (
                    <Line type="monotone" dataKey="transfers" stroke="#facc15" strokeWidth={2} dot={{ r: 2 }} />
                  )}
                  {visibleLines.volume && (
                    <Line type="monotone" dataKey="volume" stroke="#fb923c" strokeWidth={2} dot={{ r: 2 }} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendGraph;
