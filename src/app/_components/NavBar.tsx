import { FiHardDrive } from 'react-icons/fi';

export const NavBar = () => {
  return (
    <header className="bg-white dark:bg-[#1a1b26] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center">
                <FiHardDrive className="text-white text-xl" />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Store It!</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your personal cloud storage solution
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};