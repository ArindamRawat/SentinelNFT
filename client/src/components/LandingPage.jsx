import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-orbitron flex flex-col items-center px-6 py-10 space-y-20 animated-grid-bg">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-4xl fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold glowing-purple">
          SentinelNFT Intelligence Dashboard
        </h1>
        <div className="neon-divider" />
        <p className="text-lg md:text-xl text-gray-300 tracking-wide neon-border p-4 rounded-xl">
          Explore NFT collections with AI superpowers: risk prediction, anomaly detection, Gemini analysis, and rich dashboards.
        </p>
      </section>

      {/* Why Use SentinelNFT */}
      <section className="max-w-5xl space-y-4 slide-up">
        <h2 className="text-3xl font-bold glowing-purple">Why SentinelNFT?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
          <li>Profile risk levels with proprietary AI models.</li>
          <li>Detect wash trading and whale manipulations.</li>
          <li>Track floor price and ownership changes in real time.</li>
          <li>Visualize data in a neon-powered cyberpunk interface.</li>
        </ul>
      </section>

      {/* Tech Behind SentinelNFT */}
      <section className="max-w-5xl space-y-6 slide-up">
        <h2 className="text-3xl font-bold glowing-purple">Powered by Advanced Tech</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-lg text-gray-300">
          <div className="neon-panel">
            <h3 className="text-2xl text-white mb-2">🔗 BitCrunch APIs</h3>
            <p>Real-time metrics on floor price, trades, wash trading, and whale activity.</p>
          </div>
          <div className="neon-panel">
            <h3 className="text-2xl text-white mb-2">🧠 Gemini Integration</h3>
            <p>Get clean, natural language insights from on-chain data via Google GenAI (Gemini).</p>
          </div>
          <div className="neon-panel">
            <h3 className="text-2xl text-white mb-2">🤖 Custom AI Models</h3>
            <p>Predict high-risk behavior and detect anomalies in market data dynamically.</p>
          </div>
          <div className="neon-panel">
            <h3 className="text-2xl text-white mb-2">📊 Interactive Dashboards</h3>
            <p>Navigate multiple analytics panels for scores, whales, risk, trends, holders, and more.</p>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="max-w-5xl space-y-4 fade-in">
        <h2 className="text-3xl font-bold glowing-purple">Who Should Use This?</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
          <li><strong>Investors:</strong> Make data-backed NFT trades confidently.</li>
          <li><strong>Collectors:</strong> Discover valuable projects early and safely.</li>
          <li><strong>Analysts:</strong> Research and visualize collection behaviors deeply.</li>
          <li><strong>Builders:</strong> Monitor your NFT project's health post-launch.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center space-y-6 bounce-in">
        <h2 className="text-4xl font-bold glowing-purple">Ready to Enter the Grid?</h2>
        <p className="text-gray-300 text-lg tracking-wider">Your NFT intelligence mission begins now.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-10 py-4 bg-neon-purple hover:bg-purple-800 transition duration-300 rounded-full text-white text-lg font-semibold shadow-xl glow-on-hover"
        >
          Launch Sentinel Dashboard 🚀
        </button>
      </section>
    </div>
  );
}
