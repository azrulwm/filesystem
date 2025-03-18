import React, { useState } from "react";
import { FileNode } from "@/app/utils/initialData";
import initialData from "@/app/utils/initialData";

interface FileListProps {
  inputValue: string;
  setInputValue: (value: string) => void;
}

const FileList: React.FC<FileListProps> = ({ inputValue, setInputValue }) => {
  const [fileTree, setFileTree] = useState<FileNode[]>(initialData);

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

  const addFile = (nodes: FileNode[], folderName: string): FileNode[] => {
    if (!inputValue.trim()) return nodes;

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

  const handleAddFile = (folderName: string) => {
    setFileTree(addFile(fileTree, folderName));
    setInputValue("");
  };

  const handleAddRootFile = () => {
    if (!inputValue.trim()) return;
    setFileTree([...fileTree, { name: inputValue }]);
    setInputValue("");
  };

  const renderFiles = (nodes: FileNode[]) => {
    return nodes.map((item, index) => (
      <li key={index}>
        <button
          onClick={() => item.files && handleToggleFolder(item.name)}
          onDoubleClick={() => !item.files && handleConvertToFolder(item.name)}
        >
          {item.name}{" "}
          {item.files && <span>{item.isOpen ? "[-]" : "[+]"} </span>}
        </button>
        {item.isOpen && item.files && (
          <ul>
            {renderFiles(item.files)}
            <li>
              <button onClick={() => handleAddFile(item.name)}>+</button>
            </li>
          </ul>
        )}
      </li>
    ));
  };

  return (
    <ul>
      {renderFiles(fileTree)}
      <li>
        <button onClick={handleAddRootFile}>+</button>
      </li>
    </ul>
  );
};

export default FileList;
