import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function ExpertInsightCard({ blockchain, contractAddress }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInsight, setShowInsight] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const getInsight = async () => {
  setLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gemini/insight`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blockchain,
        contract_address: contractAddress,
        time_range: timeRange,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setInsight(data.summary || 'No insight generated.');
    } else {
      console.error('Server responded with error:', data.error);
      setInsight('Error generating insight.');
    }
  } catch (err) {
    console.error('Error fetching insight:', err);
    setInsight('Network or server error while generating insight.');
  }
  setLoading(false);
};

  const handleViewClick = () => {
    setShowInsight(true);
    if (!insight && blockchain && contractAddress) {
      getInsight();
    }
  };

  const handleRefreshClick = () => {
    if (blockchain && contractAddress) {
      getInsight();
    }
  };

  const cardStyle = {
    background: 'linear-gradient(145deg, #0d0d0d, #1a1a1a)',
    color: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 0 20px rgba(255, 0, 255, 0.4)',
    border: '1px solid #8000ff',
    fontFamily: 'Orbitron, sans-serif',
    animation: 'pulseBorder 4s infinite',
  };

  const selectStyle = {
    backgroundColor: '#111',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid #a020f0',
    fontFamily: 'Orbitron, sans-serif',
    marginRight: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#ff0080',
    border: '1px solid #ff66cc',
    color: '#ffffff',
    padding: '10px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px #ff66cc, 0 0 20px #ff0080',
  };

  const refreshButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#00ffcc',
    border: '1px solid #66fff0',
    color: '#000000',
    boxShadow: '0 0 10px #66fff0, 0 0 20px #00ffcc',
    fontSize: '12px',
    padding: '6px 12px',
  };

  const headingStyle = {
    color: '#a020f0',
    fontSize: '20px',
    fontWeight: 'bold',
    textShadow: '0 0 8px #a020f0',
  };

  const proseStyle = {
    marginTop: '20px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#e0e0e0',
    textShadow: '0 0 3px rgba(255,255,255,0.2)',
  };

  return (
    <div style={cardStyle}>
      <style>{`
        @keyframes pulseBorder {
          0%, 100% {
            box-shadow: 0 0 10px #a020f0, 0 0 20px #ff0080, 0 0 30px #00ffcc;
          }
          50% {
            box-shadow: 0 0 20px #ff0080, 0 0 30px #00ffcc, 0 0 40px #a020f0;
          }
        }
        .neon-strong {
          color: #ffcc00;
          text-shadow: 0 0 6px #ffcc00;
          font-weight: bold;
        }
        .neon-heading {
          color: #ff0080;
          text-shadow: 0 0 8px #ff0080;
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={headingStyle}>🧠 Gemini Expert Insight</h2>
        {showInsight && !loading && (
          <button style={refreshButtonStyle} onClick={handleRefreshClick}>
            Refresh
          </button>
        )}
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ marginRight: '8px' }}>Time Range:</label>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={selectStyle}>
          <option value="24h">24h</option>
          <option value="7d">7d</option>
          <option value="30d">30d</option>
          <option value="all">All</option>
        </select>
      </div>

      {!showInsight ? (
        <button style={buttonStyle} onClick={handleViewClick}>
          View Insight
        </button>
      ) : loading ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>⚙️ Analyzing data with Gemini...</p>
      ) : (
        <div style={proseStyle}>
          <ReactMarkdown
            components={{
              strong: ({ children }) => <strong className="neon-strong">{children}</strong>,
              h1: ({ children }) => <h1 className="neon-heading">{children}</h1>,
              h2: ({ children }) => <h2 className="neon-heading">{children}</h2>,
              h3: ({ children }) => <h3 className="neon-heading">{children}</h3>,
              p: ({ children }) => <p style={{ marginBottom: '12px' }}>{children}</p>,
            }}
          >
            {insight}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default ExpertInsightCard;
