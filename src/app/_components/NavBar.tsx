import { FiHardDrive, FiCloudSnow, FiStar } from 'react-icons/fi';

interface NavBarProps {
  categories: string[] | undefined;
}

export const NavBar = ({ categories }: NavBarProps) => {
  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <span className="flex items-center space-x-3">
          <span className="bg-purple-400 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
            <FiHardDrive className="text-gray-900 text-xl" />
          </span>
          <span>
            <h1 className="text-2xl font-bold text-white">Store It!</h1>
            <p className="text-xs text-purple-300">Tu gestor de archivos</p>
          </span>
        </span>

        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {(categories ?? []).map((category) => (
              <li key={category} className="relative group">
                <a className="text-gray-200 font-medium hover:text-purple-300 transition-colors duration-200">
                  {category}
                </a>
                <span className="absolute h-0.5 w-0 bg-purple-400 bottom-0 left-0 group-hover:w-full transition-all duration-300"></span>
              </li>
            ))}
          </ul>
        </nav>

        <section className="flex items-center space-x-4">
          <span className="flex items-center text-gray-400 text-sm">
            <FiCloudSnow className="mr-1 text-purple-300" />
            <span className="hidden sm:inline">12.4 GB disponibles</span>
          </span>
          
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-full py-1.5 px-3 flex items-center text-white text-sm font-medium shadow-lg">
            <FiStar className="mr-1" />
            <span className="hidden sm:inline">Pro</span>
          </span>
        </section>
      </section>
    </header>
  );
};