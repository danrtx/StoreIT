import { FiHardDrive } from 'react-icons/fi';

interface NavBarProps {
  categories: string[] | undefined; 
}

export const NavBar = ({ categories }: NavBarProps) => {
  return (
    <header className="bg-white dark:bg-[#1a1b26] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-14 h-14 rounded-lg flex items-center justify-center">
              <FiHardDrive className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Store It!</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Your personal cloud storage solution
              </p>
            </div>
          </div>

          {/* Mostrar las categorías */}
          <nav className="mt-4">
            <ul className="flex space-x-4">
              {(categories ?? []).map((category) => (
                <li
                  key={category}
                  className="text-gray-700 dark:text-gray-300 font-semibold text-lg cursor-pointer hover:text-blue-600"
                >
                  {category}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
