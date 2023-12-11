import path from 'path';
import { fileURLToPath } from 'url';
import generateDifference from '../src/index.js';
import stylishResult from '../__fixtures__/stylishResult.js';
import plainResult from '../__fixtures__/plainResult.js';
import jsonResult from '../__fixtures__/jsonResult.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const extensions = ['yml', 'yaml', 'json'];

test.each(extensions)('generateDifference with %s extension', (ext) => {
  const fileBefore = getFixturePath(`file1.${ext}`);
  const fileAfter = getFixturePath(`file2.${ext}`);

  expect(generateDifference(fileBefore, fileAfter, 'stylish')).toEqual(stylishResult);
  expect(generateDifference(fileBefore, fileAfter, 'plain')).toEqual(plainResult);
  expect(generateDifference(fileBefore, fileAfter, 'json')).toEqual(jsonResult);
  expect(generateDifference(fileBefore, fileAfter)).toEqual(stylishResult);
});
