import path from 'path';
import yaml from 'js-yaml';

const parsingData = (data, file) => {
  if (path.extname(file) === '.json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parsingData;
