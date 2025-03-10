import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'

// Simple error boundary for catching rendering errors
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by error boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h2>Something went wrong</h2>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Global error handler
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  console.log('🔴 ERROR INTERCEPTED:', ...args);
  originalConsoleError.apply(console, args);
};

// Create mock user in localStorage if it doesn't exist (for development)
if (process.env.NODE_ENV === 'development') {
  try {
    if (!localStorage.getItem('bracket_vote_mock_user')) {
      console.log('Creating mock user in localStorage for development');
      const mockUser = {
        id: 'mock-user-id',
        email: 'dev@example.com',
        user_metadata: {
          name: 'Development User',
          score: 120,
          avatar_url: 'https://i.pravatar.cc/150?u=dev@example.com'
        },
        app_metadata: { provider: 'mock' },
        aud: 'authenticated',
        created_at: new Date().toISOString()
      };
      localStorage.setItem('bracket_vote_mock_user', JSON.stringify(mockUser));
    }
  } catch (error) {
    console.error('Failed to set mock user:', error);
  }
}

// Debug app initialization
console.log('🔄 INITIALIZING BRACKET VOTE APP');

// Find the root element
const rootElement = document.getElementById('root');

// Ensure the root element exists
if (rootElement) {
  console.log('✅ Root element found, rendering app...');
  
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
  
  console.log('✅ React render call completed');
} else {
  console.error('❌ Root element not found! The app cannot be mounted.');
}