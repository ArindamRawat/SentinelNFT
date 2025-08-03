import { useState } from 'react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [contract, setContract] = useState('');
  const [blockchain, setBlockchain] = useState('ethereum');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contract.trim()) {
      onSearch({ contract, blockchain });
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black bg-neon-pulse p-6 rounded-2xl shadow-lg border border-purple-600 relative overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Holographic Shine */}
      <div className="absolute inset-0 pointer-events-none shine-effect" />

      <input
        type="text"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        placeholder="Enter contract address"
        className="w-full p-3 rounded-md border border-purple-500 bg-black text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 glassy-input"
      />

      <select
  value={blockchain}
  onChange={(e) => setBlockchain(e.target.value)}
  className="px-4 py-2 border border-purple-500 rounded-md text-white bg-black placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 glassy-input"
  style={{
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // ensures background on click
    color: '#fff', // visible text
  }}
>
  <option className="bg-black text-white" value="ethereum">Ethereum</option>
  <option className="bg-black text-white" value="polygon">Polygon</option>
  <option className="bg-black text-white" value="bnb">BNB Chain</option>
</select>


      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-md transition duration-300 hover:bg-purple-700 shadow-neon"
      >
        Search
      </motion.button>
    </motion.form>
  );
};

export default SearchBar;
