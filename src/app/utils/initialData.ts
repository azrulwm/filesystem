interface FileNode {
  name: string;
  isOpen?: boolean;
  files?: FileNode[];
}

const initialData: FileNode[] = [
  {
    name: "node_modules",
  },
  {
    name: "public",
    isOpen: false,
    files: [
      {
        name: "index.html",
        isOpen: false,
      },
    ],
  },
  {
    name: "src",
    isOpen: true,
    files: [
      {
        name: "App.tsx",
      },
      {
        name: "components",
        isOpen: false,
        files: [{ name: "File.tsx" }],
      },
    ],
  },
  {
    name: "Git",
    isOpen: false,
    files: [
      {
        name: ".gitignore",
      },
      {
        name: "Commits",
        isOpen: false,
        files: [{ name: "First commit" }],
      },
    ],
  },
];

export default initialData;
export type { FileNode };
