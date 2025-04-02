import React from 'react';
import { FiHardDrive } from 'react-icons/fi';

// Exportación por defecto en lugar de exportación nombrada
export default function NavBar() {
  return (
    <header className="bg-gray-900 flex items-center justify-between px-6 py-3 shadow-md border-b border-gray-800">
      {/* Logo y título */}
      <div className="flex items-center space-x-3">
        <span className="bg-purple-400 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
          <FiHardDrive className="text-gray-900 text-xl" />
        </span>
        <span>
          <h1 className="text-xl font-bold text-white">Store It!</h1>
          <p className="text-xs text-purple-300">Tu gestor de archivos</p>
        </span>
      </div>
      
      {/* Elementos decorativos en el centro */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="h-3 w-3 rounded-full bg-purple-400"></div>
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
      
      {/* Elementos decorativos a la derecha */}
      <div className="flex items-center space-x-2">
        <span className="px-3 py-1 text-xs font-medium text-purple-200 border border-purple-500 rounded-md">
          12.4 GB
        </span>
        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="w-3/4 h-full bg-gradient-to-r from-purple-400 to-blue-500"></div>
        </div>
      </div>
    </header>
  );
}