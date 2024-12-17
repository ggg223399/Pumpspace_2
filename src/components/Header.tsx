import React from 'react';
import { Globe, Bot, MessageCircle, Users } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#0D1117] text-white p-4 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Pump Space</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Globe size={18} />
            <select className="bg-transparent border-none text-sm">
              <option>English</option>
            </select>
          </div>
          
          <button className="flex items-center space-x-2 bg-[#1A1F26] px-3 py-1.5 rounded-lg">
            <Bot size={18} />
            <span className="text-sm">Tracking SM via TG Bot</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-[#1A1F26] px-3 py-1.5 rounded-lg">
            <MessageCircle size={18} />
            <span className="text-sm">Join our signal channel</span>
          </button>
          
          <button className="flex items-center space-x-2 bg-[#1A1F26] px-3 py-1.5 rounded-lg">
            <Users size={18} />
            <span className="text-sm">Join our TG group</span>
          </button>
        </div>
      </div>
    </header>
  );
}