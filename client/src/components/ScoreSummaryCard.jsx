import React, { useState } from 'react';

const getRating = (score) => {
  if (score >= 80) return '🔥 Famous';
  if (score >= 60) return '✅ Recommended';
  if (score >= 40) return '😐 Average';
  return '❌ Not Recommended';
};

const ScoreSummaryCard = ({ blockchain, contractAddress }) => {
  const [scores, setScores] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewClick = async () => {
    setIsVisible(true);
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/api/v2/nft/collection/profile?blockchain=${blockchain}&contract_address=${contractAddress}`
      );
      const data = await response.json();
      setScores(data);
    } catch (err) {
      setError('Failed to fetch score data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const neonBoxStyle = 'bg-[#1a1a1a] text-white p-3 rounded-lg border border-purple-500 shadow-[0_0_10px_#8000ff80]';

  if (!isVisible) {
    return (
      <div className="bg-black text-white p-6 rounded-2xl border border-purple-600 shadow-[0_0_20px_#8000ff]">
        <h2 className="text-xl font-semibold mb-2 text-purple-400">📊 Collection Rating</h2>
        <button
          onClick={handleViewClick}
          className="mt-2 px-4 py-2 bg-purple-700 hover:bg-orange-500 transition text-white font-semibold rounded-xl shadow-[0_0_12px_#ff00ff80]"
        >
          View
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900 text-red-300 rounded-xl border border-red-500">
        {error}
      </div>
    );
  }

  if (isLoading || !scores) {
    return (
      <div className="p-4 bg-[#111] text-white border border-purple-700 rounded-xl shadow">
        Loading...
      </div>
    );
  }

  const avgScore = (
    (Number(scores.collection_score) +
      Number(scores.liquidity_score) +
      Number(scores.metadata_score) +
      Number(scores.market_dominance_score) +
      Number(scores.token_distribution_score) +
      Number(scores.fear_and_greed_index) +
      Number(scores.holder_metrics_score)) / 7
  ).toFixed(2);

  const rating = getRating(avgScore);

  return (
    <div className="bg-black text-white p-6 rounded-2xl border border-purple-600 shadow-[0_0_20px_#8000ff]">
      <h2 className="text-xl font-semibold mb-2 text-purple-400">📊 Collection Rating</h2>
      <p className="text-3xl font-bold mb-6 text-orange-400 glow-text">{rating}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[15px]">
        <div className={neonBoxStyle}>
          <div className="text-purple-300">📈 Collection Score</div>
          <div className="font-bold text-white">{Number(scores.collection_score).toFixed(2)}</div>
        </div>
        <div className={neonBoxStyle}>
          <div className="text-purple-300">💧 Liquidity Score</div>
          <div className="font-bold text-white">{Number(scores.liquidity_score).toFixed(2)}</div>
        </div>
        <div className={neonBoxStyle}>
          <div className="text-purple-300">📦 Metadata Score</div>
          <div className="font-bold text-white">{Number(scores.metadata_score).toFixed(2)}</div>
        </div>
        <div className={neonBoxStyle}>
          <div className="text-purple-300">🏆 Market Dominance</div>
          <div className="font-bold text-white">{Number(scores.market_dominance_score).toFixed(2)}</div>
        </div>
        <div className={neonBoxStyle}>
          <div className="text-purple-300">🧠 Holder Metrics</div>
          <div className="font-bold text-white">{Number(scores.holder_metrics_score).toFixed(2)}</div>
        </div>
        <div className={neonBoxStyle}>
          <div className="text-purple-300">📊 Token Distribution</div>
          <div className="font-bold text-white">{Number(scores.token_distribution_score).toFixed(2)}</div>
        </div>
        <div className={`${neonBoxStyle} col-span-1 sm:col-span-2`}>
          <div className="text-purple-300">😨 Fear & Greed</div>
          <div className="font-bold text-white">{Number(scores.fear_and_greed_index).toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-5 text-lg font-bold text-orange-400 glow-text">
        🔮 Overall Score: <span className="text-white">{avgScore}</span>
      </div>
    </div>
  );
};

export default ScoreSummaryCard;
