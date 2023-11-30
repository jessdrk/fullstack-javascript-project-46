import path from 'path';
import { load } from 'js-yaml';

const parsingData = (data, file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(data);
  }
  return load(data);
};

export default parsingData;
