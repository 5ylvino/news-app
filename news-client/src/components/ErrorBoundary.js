import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='h-screen flex items-center justify-center'>
          <h1 className='text-2xl font-bold text-red-600'>
            Something went wrong. Please try again later.
          </h1>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
