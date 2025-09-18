import { type JSX } from 'react';

function Loading(): JSX.Element {
    return (
      <div className="py-16 text-center text-sm text-gray-500">
        <div className="loader"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
};

export default Loading;