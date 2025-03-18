import React, { useState } from "react";
import { FileNode } from "@/app/utils/initialData";
import initialData from "@/app/utils/initialData";

const FileList: React.FC = () => {
  const [fileTree, setFileTree] = useState<FileNode[]>(initialData);
  const [inputValue, setInputValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);

  const toggleFolder = (nodes: FileNode[], name: string): FileNode[] => {
    return nodes.map((node) => {
      if (node.name === name) {
        return { ...node, isOpen: !node.isOpen };
      } else if (node.files) {
        return { ...node, files: toggleFolder(node.files, name) };
      }
      return node;
    });
  };

  const convertToFolder = (nodes: FileNode[], name: string): FileNode[] => {
    return nodes.map((node) => {
      if (node.name === name && !node.files) {
        return { ...node, files: [], isOpen: true };
      } else if (node.files) {
        return { ...node, files: convertToFolder(node.files, name) };
      }
      return node;
    });
  };

  const addFile = (
    nodes: FileNode[],
    folderName: string | null
  ): FileNode[] => {
    if (!inputValue.trim()) return nodes;

    if (folderName === null) {
      return [...nodes, { name: inputValue }];
    }

    return nodes.map((node) => {
      if (node.name === folderName) {
        if (!node.files) {
          return { ...node, files: [{ name: inputValue }], isOpen: true };
        }
        return {
          ...node,
          isOpen: true,
          files: [...node.files, { name: inputValue }],
        };
      } else if (node.files) {
        return { ...node, files: addFile(node.files, folderName) };
      }
      return node;
    });
  };

  const handleToggleFolder = (name: string) => {
    setFileTree(toggleFolder(fileTree, name));
  };

  const handleConvertToFolder = (name: string) => {
    setFileTree(convertToFolder(fileTree, name));
  };

  const handleAddFileClick = (folderName: string | null) => {
    setActiveFolder(folderName);
    setShowInput(true);
  };

  const handleAddFile = () => {
    if (inputValue.trim()) {
      setFileTree(addFile(fileTree, activeFolder));
      setInputValue("");
      setShowInput(false);
      setActiveFolder(null);
    }
  };

  const renderFiles = (nodes: FileNode[]) => {
    return nodes.map((item, index) => (
      <li key={index} className="my-2">
        <button
          className={`flex items-center px-4 py-3 rounded-lg text-lg w-full
            transition-all duration-150 group relative
            ${
              item.files
                ? "hover:bg-blue-50 text-blue-700"
                : "hover:bg-gray-50 text-gray-700"
            }
            ${item.files && item.isOpen ? "bg-blue-50/50" : ""}
          `}
          onClick={() => item.files && handleToggleFolder(item.name)}
          onDoubleClick={() => !item.files && handleConvertToFolder(item.name)}
        >
          <div
            className={`
            mr-3 flex items-center justify-center w-8 h-8 rounded-lg
            ${item.files ? "text-blue-600" : "text-gray-500"}
            ${item.files ? "bg-blue-100" : "bg-gray-100"}
          `}
          >
            {item.files ? (
              item.isOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
                  />
                </svg>
              )
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>
          <span className="font-medium">{item.name}</span>
          {item.files && (
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
              {item.isOpen ? "▾" : "▸"}
            </span>
          )}
        </button>
        {item.files && item.isOpen && (
          <ul className="ml-8 pl-4 border-l-2 border-blue-100 mt-1">
            {renderFiles(item.files)}
            <li className="my-2">
              <button
                onClick={() => handleAddFileClick(item.name)}
                className="flex items-center px-4 py-3 rounded-lg text-lg w-full
                  text-blue-600 hover:bg-blue-50 transition-colors duration-150"
              >
                <div className="mr-3 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <span className="font-medium">Add File</span>
              </button>
            </li>
          </ul>
        )}
      </li>
    ));
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm my-8">
        <div className="border-b border-gray-100 px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">File System</h1>
        </div>

        <div className="p-6 relative">
          <div className={showInput ? "blur-sm" : ""}>
            <ul className="space-y-1">
              {renderFiles(fileTree)}
              <li className="mt-6">
                <button
                  onClick={() => handleAddFileClick(null)}
                  className="flex items-center px-4 py-3 rounded-lg text-lg w-full
                    text-blue-600 hover:bg-blue-50 transition-colors duration-150"
                >
                  <div className="mr-3 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">New File</span>
                </button>
              </li>
            </ul>
          </div>

          {showInput && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/30">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <input
                  className="w-full px-4 py-2 text-xl border rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  type="text"
                  placeholder="Enter file name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddFile();
                    }
                    if (e.key === "Escape") {
                      setShowInput(false);
                      setInputValue("");
                      setActiveFolder(null);
                    }
                  }}
                />
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowInput(false);
                      setInputValue("");
                      setActiveFolder(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-lg transition-colors duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFile}
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg text-lg transition-colors duration-150"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileList;
