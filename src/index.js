import fs from 'fs';
import path from 'path';
import parsingData from './parsers.js';
import chooseFormat from './formatters/index.js';
import createAST from './createAST.js';

const readFile = (filepath) => {
  const fileData = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  return parsingData(fileData, filepath);
};

const generateDifference = (filepath1, filepath2, format = 'stylish') => {
  const obj1 = readFile(filepath1);
  const obj2 = readFile(filepath2);
  const diff = createAST(obj1, obj2);
  const formatDiff = chooseFormat(diff, format);
  return formatDiff;
};

export default generateDifference;
