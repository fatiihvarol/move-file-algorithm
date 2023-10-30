"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDestionationFolderExist(list, destination) {
    const destinationFolder = list.find((folder) => folder.id === destination);
    if (!destinationFolder) {
        throw new Error(`You cannot specify a file as the destination`);
    }
}
function isSourceFileExist(list, source) {
    const isFound = list.some((folder) => folder.files.some((file) => file.id === source));
    if (!isFound) {
        throw new Error(`You cannot move a folder`);
    }
}
function makeMove(list, source, destination) {
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
function move(list, source, destination) {
    isSourceFileExist(list, source);
    isDestionationFolderExist(list, destination);
    return makeMove(list, source, destination);
}
exports.default = move;
//# sourceMappingURL=move.js.map