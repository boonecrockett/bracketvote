import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Layout: React.FC = () => {
  const authState = useAuthStore();
  const { user, anonymousUser, signOut } = authState;
  const location = useLocation();

  // Add debugging information
  console.log('Rendering Layout component', { path: location.pathname });

  // Helper to determine if a link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-blue-600">
            <svg 
              className="w-8 h-8" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path 
                d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6V18C22 18.5523 21.5523 19 21 19H3C2.44772 19 2 18.5523 2 18V6Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M12 5V19" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M8 10H4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M8 14H4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M20 10H16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
              <path 
                d="M20 14H16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
              />
            </svg>
            <span className="text-2xl font-bold">BracketVote</span>
          </Link>
          
          <nav className="flex items-center space-x-1 sm:space-x-4 mt-4 sm:mt-0">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/leaderboard') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Leaderboard
            </Link>
            
            <Link 
              to="/bracket" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/bracket') 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Bracket
            </Link>
            
            {/* Show admin link only for admin users */}
            {user?.email === 'admin@example.com' && (
              <Link 
                to="/admin" 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/admin') 
                    ? 'bg-red-50 text-red-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Admin
              </Link>
            )}
            
            <div className="border-l border-gray-300 h-6 hidden sm:block"></div>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-600">
                    {user.email.split('@')[0]}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {user.score} pts
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  aria-label="Sign out"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 sm:hidden" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                    />
                  </svg>
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {anonymousUser && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {anonymousUser.score} pts
                  </span>
                )}
                <Link
                  to="/login"
                  className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Sign In
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Simple error boundary */}
          <React.Suspense fallback={
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading content...</p>
            </div>
          }>
            <Outlet />
          </React.Suspense>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-gray-800 font-bold text-lg mb-3">BracketVote</h3>
              <p className="text-gray-600 text-sm">
                A platform for running bracket-style competitions where users vote on matchups to determine winners.
              </p>
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-blue-600 hover:underline text-sm">Home</Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="text-blue-600 hover:underline text-sm">Leaderboard</Link>
                </li>
                <li>
                  <Link to="/bracket" className="text-blue-600 hover:underline text-sm">Bracket</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-800 font-bold text-lg mb-3">About</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/boonecrockett/bracketvote" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">GitHub</a>
                </li>
                <li>
                  <a href="/privacy" className="text-blue-600 hover:underline text-sm">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="text-blue-600 hover:underline text-sm">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} BracketVote. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;