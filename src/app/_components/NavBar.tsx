import { FiHardDrive } from 'react-icons/fi';

interface NavBarProps {
  categories: string[] | undefined;
}

export const NavBar = ({ categories }: NavBarProps) => {
  return (
    <header className="bg-gray-900 shadow-md sticky top-0 z-50 border-b border-gray-800">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo y título */}
        <span className="flex items-center space-x-3">
          <span className="bg-purple-400 w-10 h-10 rounded-lg flex items-center justify-center shadow-md">
            <FiHardDrive className="text-gray-900 text-xl" />
          </span>
          <span>
            <h1 className="text-2xl font-bold text-white">Store It!</h1>
            <p className="text-xs text-purple-300">Tu gestor de archivos</p>
          </span>
        </span>

        {/* Navegación principal */}
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

        {/* Área para acciones relacionadas con archivos */}
        <section className="flex items-center space-x-3">
          <button className="p-2 rounded-full text-gray-200 hover:bg-gray-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-2 rounded-full text-gray-200 hover:bg-gray-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </section>
      </section>
    </header>
  );
};