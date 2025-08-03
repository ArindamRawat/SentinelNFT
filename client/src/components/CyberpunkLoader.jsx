import React from 'react';

function CyberpunkLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <h2 className="text-neon font-orbitron text-2xl">Booting Sentinel...</h2>
      </div>
    </div>
  );
}

export default CyberpunkLoader;
