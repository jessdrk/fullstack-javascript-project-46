/* eslint-disable quotes */
import path from 'path';
import { fileURLToPath } from 'url';
import generateDifference from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('stylish', () => {
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
  expect(generateDifference(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.json'), getFixturePath('/file2.json'))).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yml'), getFixturePath('/file2.yml'))).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yaml'), getFixturePath('/file2.yaml'))).toEqual(result);
});

test('plain', () => {
  const result = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  expect(generateDifference(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.json'), getFixturePath('/file2.json'), 'plain')).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yml'), getFixturePath('/file2.yml'), 'plain')).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yaml'), getFixturePath('/file2.yaml'), 'plain')).toEqual(result);
});

test('json', () => {
  const result = `[{"name":"common","type":"nested","status":"unchanged","children":[{"name":"follow","type":"leaf","status":"added","value":false},{"name":"setting1","type":"leaf","status":"unchanged","value":"Value 1"},{"name":"setting2","type":"leaf","status":"deleted","value":200},{"name":"setting3","status":"changed","oldType":"leaf","newType":"leaf","oldValue":true,"newValue":null},{"name":"setting4","type":"leaf","status":"added","value":"blah blah"},{"name":"setting5","type":"nested","status":"added","value":[{"name":"key5","type":"leaf","status":"unchanged","value":"value5"}]},{"name":"setting6","type":"nested","status":"unchanged","children":[{"name":"doge","type":"nested","status":"unchanged","children":[{"name":"wow","status":"changed","oldType":"leaf","newType":"leaf","oldValue":"","newValue":"so much"}]},{"name":"key","type":"leaf","status":"unchanged","value":"value"},{"name":"ops","type":"leaf","status":"added","value":"vops"}]}]},{"name":"group1","type":"nested","status":"unchanged","children":[{"name":"baz","status":"changed","oldType":"leaf","newType":"leaf","oldValue":"bas","newValue":"bars"},{"name":"foo","type":"leaf","status":"unchanged","value":"bar"},{"name":"nest","status":"changed","oldType":"nested","newType":"leaf","oldValue":[{"name":"key","type":"leaf","status":"unchanged","value":"value"}],"newValue":"str"}]},{"name":"group2","type":"nested","status":"deleted","value":[{"name":"abc","type":"leaf","status":"unchanged","value":12345},{"name":"deep","type":"nested","status":"unchanged","value":[{"name":"id","type":"leaf","status":"unchanged","value":45}]}]},{"name":"group3","type":"nested","status":"added","value":[{"name":"deep","type":"nested","status":"unchanged","value":[{"name":"id","type":"nested","status":"unchanged","value":[{"name":"number","type":"leaf","status":"unchanged","value":45}]}]},{"name":"fee","type":"leaf","status":"unchanged","value":100500}]}]`;

  expect(generateDifference(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.json'), getFixturePath('/file2.json'), 'json')).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yml'), getFixturePath('/file2.yml'), 'json')).toEqual(result);
  expect(generateDifference(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toEqual(result);
  expect(generateDifference(getFixturePath('/file1.yaml'), getFixturePath('/file2.yaml'), 'json')).toEqual(result);
});
