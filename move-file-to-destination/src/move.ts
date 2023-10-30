type List = {
  id: string;
  name: string;
  files: File[];
}[];

type File = {
  id: string;
  name: string;
};

function isDestionationFolderExist(list: List, destination: string) {
  const destinationFolder = list.find((folder) => folder.id === destination);
  if (!destinationFolder) {
    throw new Error(`You cannot specify a file as the destination`);
  }
}

function isSourceFileExist(list: List, source: string) {
  const isFound = list.some((folder) => folder.files.some((file) => file.id === source));
  if (!isFound) {
    throw new Error(`You cannot move a folder`);
  }
}

function makeMove(list: List, source: string, destination: string): List {
  const destinationFolder = list.find((folder) => folder.id === destination);
  const sourceFolder = list.find((folder) => folder.files.some((file) => file.id === source));

  if (destinationFolder && sourceFolder) {
    const fileToMove = sourceFolder.files.find((file) => file.id === source);
    if (fileToMove) {
      destinationFolder.files.push(fileToMove);
      sourceFolder.files = sourceFolder.files.filter((file) => file.id !== source);
    }
  }

  return list;
}

export default function move(list: List, source: string, destination: string): List {
  isSourceFileExist(list, source);

  isDestionationFolderExist(list, destination);

  return makeMove(list, source, destination); 
}
