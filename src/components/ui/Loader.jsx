import React from 'react';
import styled from 'styled-components';

const Loader = ({ fullScreen = false }) => {
  // Bar loader component with styled-components
  const BarLoader = () => (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );

  // If fullScreen is true, render a full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="text-center">
          <BarLoader />
          {/* <p className="mt-4 text-primary-600 font-medium">Loading...</p> */}
        </div>
      </div>
    );
  }

  // Otherwise, render just the bar loader
  return <BarLoader />;
};

const StyledWrapper = styled.div`
  .loader {
    display: block;
    --height-of-loader: 4px;
    --loader-color: #0071e2;
    width: 130px;
    height: var(--height-of-loader);
    border-radius: 30px;
    background-color: rgba(0,0,0,0.2);
    position: relative;
  }

  .loader::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: moving 1s ease-in-out infinite;
  }

  @keyframes moving {
    50% {
      width: 100%;
    }

    100% {
      width: 0;
      right: 0;
      left: unset;
    }
  }
`;

// Secondary component for page transitions or initial app loading
export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <div className="w-24 h-24 relative">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-primary-100"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-8 border-t-primary-600 animate-spin"></div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-medium text-secondary-800">Loading</h3>
        <div className="flex justify-center mt-2">
          <span className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-primary-500 delay-0"></span>
          <span className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-primary-500 delay-150"></span>
          <span className="animate-bounce mx-0.5 h-2 w-2 rounded-full bg-primary-500 delay-300"></span>
        </div>
      </div>
    </div>
  );
};

// Content loader for skeleton screens
export const ContentLoader = ({ className }) => {
  return (
    <div className={`animate-pulse bg-secondary-200 rounded ${className}`}></div>
  );
};

export default Loader;
