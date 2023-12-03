import path from 'path';
import yaml from 'js-yaml';

const parsingData = (data, file) => {
  const extension = path.extname(file);
  switch (extension) {
    case '.json': return JSON.parse(data);
    case '.yml':
    case '.yaml': return yaml.load(data);
    default: throw new Error(`Invalid extension: ${extension}`);
  }
};

export default parsingData;
