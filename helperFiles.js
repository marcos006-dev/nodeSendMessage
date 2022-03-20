const fs = require('fs');

const createFile = (fileName, content) => {
  try {
    fs.writeFileSync(`./archives/${fileName}.txt`, content);
    return true;
  } catch (e) {
    return false;
  }
};

const verifyIfExistsFile = (fileName) =>
  fs.existsSync(`./archives/${fileName}.txt`);

const getFilesFolder = (path) => fs.readdirSync(path);

module.exports = {
  createFile,
  verifyIfExistsFile,
  getFilesFolder,
};
