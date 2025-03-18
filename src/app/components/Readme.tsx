import React, { useState } from "react";

const README: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-150"
        title="Help"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                File System Guide
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6 text-gray-600">
              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  File Management
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Add files using:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>{'"Add File" button inside folders'}</li>
                      <li>{'"New File" button at the root level'}</li>
                    </ul>
                  </li>
                  <li>Double-click any file to convert it into a folder</li>
                  <li>Click a folder to toggle it open/closed</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Visual Guide
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="text-gray-500">Files</span> - Gray icons
                    with no arrow
                  </li>
                  <li>
                    <span className="text-blue-600">Folders</span> - Blue icons
                    with arrow indicators
                  </li>
                  <li>
                    Nested files are shown with a blue line to indicate
                    hierarchy
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Quick Tips
                </h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    When adding files:
                    <ul className="list-circle pl-5 mt-1 space-y-1">
                      <li>Press Enter to confirm</li>
                      <li>Press Escape to cancel</li>
                    </ul>
                  </li>
                  <li>Hover over items to see available actions</li>
                </ul>
              </section>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default README;
