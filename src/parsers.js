import path from 'path';
import { load } from 'js-yaml';

const parsingData = (data, file) => {
  let result;
  if (path.extname(file) === '.json') {
    result = JSON.parse(data);
  } if (path.extname(file) === '.yml' || path.extname(file) === '.yaml') {
    result = load(data);
  }
  return result;
};

export default parsingData;
