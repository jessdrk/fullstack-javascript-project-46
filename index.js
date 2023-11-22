import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getPath = (filepath) => {
  const currentPath = process.cwd();
  if (path.isAbsolute(filepath)) {
    return `${currentPath}${filepath}`;
  }
  return path.resolve(currentPath, filepath);
};

const readFile = (file) => JSON.parse(fs.readFileSync(getPath(file), { encoding: 'utf-8' }));

const func = (filepath1, filepath2) => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const generalKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(generalKeys);
  const cb = (acc, key) => {
    let newAcc;
    if (obj1[key] === obj2[key]) {
      newAcc = `${acc}    ${key}: ${obj1[key]}\n`;
    } else if (!Object.hasOwn(obj2, key)) {
      newAcc = `${acc}  - ${key}: ${obj1[key]}\n`;
    } else if (!Object.hasOwn(obj1, key)) {
      newAcc = `${acc}  + ${key}: ${obj2[key]}\n`;
    } else {
      newAcc = `${acc}  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n`;
    }
    return newAcc;
  };
  let result = sortedKeys.reduce(cb, '');
  result = `{\n${result}}`;
  return result;
};

export default func;
