import stylish from './stylish.js';
import plain from './plain.js';

const chooseFormat = (tree, formatName) => {
  switch (formatName) {
    case 'stylish': return stylish(tree);
    case 'plain': return plain(tree);
    case 'json': return JSON.stringify(tree);
    default: throw new Error(`Invalid format - ${formatName}`);
  }
};

export default chooseFormat;
