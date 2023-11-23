import func from '../index.js';

test('gendiff', () => {
  const result = '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';
  expect(func('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
  expect(func('/__fixtures__/file1.json', '/__fixtures__/file2.json')).toEqual(result);
  expect(func('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(result);
  expect(func('/__fixtures__/file1.yml', '/__fixtures__/file2.yml')).toEqual(result);
  expect(func('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(result);
  expect(func('/__fixtures__/file1.yaml', '/__fixtures__/file2.yaml')).toEqual(result);
});
