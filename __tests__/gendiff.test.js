import func from '../index.js';

test('gendiff', () => {
  const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  expect(func('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(result);
  expect(func('/__fixtures__/file1.json', '/__fixtures__/file2.json')).toEqual(result);
  expect(func('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(result);
  expect(func('/__fixtures__/file1.yml', '/__fixtures__/file2.yml')).toEqual(result);
  expect(func('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(result);
  expect(func('/__fixtures__/file1.yaml', '/__fixtures__/file2.yaml')).toEqual(result);
});
