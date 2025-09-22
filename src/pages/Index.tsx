import React from 'react';
import { ChevronDown, Search, MapPin, Layers } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <header className="bg-gray-800 shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="OneForce Logo" className="h-8 mr-2" />
          <h1 className="text-xl font-bold">OneForce</h1>
        </div>
        <div className="flex items-center">
          <span className="mr-2">John Doe</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-gray-900 shadow-md p-4 overflow-y-auto">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-800 text-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <h2 className="font-bold mb-2">Categories</h2>
          <ul>
            <li className="mb-2 flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>Points of Interest</span>
            </li>
            <li className="mb-2 flex items-center">
              <Layers className="h-4 w-4 mr-2" />
              <span>Layers</span>
            </li>
          </ul>
        </aside>

        <main className="flex-1 relative">
          <iframe 
            width='100%' 
            height='100%' 
            src="https://api.mapbox.com/styles/v1/ninejoe-2024/cm24cls1y00dp01qvc095800v.html?title=false&access_token=pk.eyJ1IjoibmluZWpvZS0yMDI0IiwiYSI6ImNtMjRjZ3F2ZjBkeW8yanM2c2c0bGNwaXEifQ.i1ap-69ucCf7JcjAMf3S_Q&zoomwheel=false#16.44/13.684036/100.547402/340.4/72" 
            title="Mapbox" 
            style={{border: 'none'}}
          ></iframe>
        </main>
      </div>

      <footer className="bg-gray-800 p-4 text-center">
        <p>&copy; 2023 OneForce. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;