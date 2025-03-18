"use client";

import FileList from "./FileList";

const File: React.FC = () => {
  return (
    <div className="layout-row justify-content-between">
      <ul data-testid="files">
        <FileList />
      </ul>
    </div>
  );
};

export default File;
