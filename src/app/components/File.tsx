"use client";

import FileList from "./FileList";
import README from "./Readme";

const File: React.FC = () => {
  return (
    <div className="layout-row justify-content-between">
      <ul data-testid="files">
        <FileList />
      </ul>

      <README />
    </div>
  );
};

export default File;
