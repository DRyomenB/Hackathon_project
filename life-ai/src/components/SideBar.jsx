import React, { useState } from 'react';

import PlayerStats from '../game/PlayerStats.jsx'
import PlayerRelationships from '../game/PlayerRelationships.jsx' 


export default function SideBar() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="SideBar flex flex-col justify-between rounded-r-lg bg-white h-screen w-84 shadow-md overflow-hidden">
      {/* HEADER (matches given style) */}
      <div className="bg-gray-100 p-4 flex justify-between items-center text-sm font-medium">
        <div className="text-xl font-semibold text-gray-800">Life AI</div>
      </div>


      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 text-gray-600 overflow-y-auto pb-[tab-height]">
        {activeTab === 'stats' && ( <PlayerStats />)}
        {activeTab === 'relationships' && ( <PlayerRelationships />)}
      </div>

      {/* BOTTOM TABS */}
      <div className="border-t border-gray-300 flex justify-around py-3 bg-gray-50 rounded-br-lg">
        {['Stats', 'Relationships'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150
              ${
                activeTab === tab.toLowerCase()
                  ? 'text-blue-600 bg-blue-100'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}


          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
