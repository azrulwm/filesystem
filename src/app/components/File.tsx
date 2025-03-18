"use client";

import { useState } from "react";
import FileList from "./FileList";

const File: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="layout-row justify-content-between">
      <ul data-testid="files">
        <FileList inputValue={inputValue} setInputValue={setInputValue} />
      </ul>
      <input
        data-testid="input-box"
        className="mt-15 mr-35 w-15"
        style={{ borderColor: "black" }}
        type="text"
        placeholder="Enter an item"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

export default File;
