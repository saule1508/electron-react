const fs = require('fs')
const yaml = require('js-yaml');

export const validateDirectory = (dir) => {
  if (fs.existsSync(dir + '/content.yml')) {
    return true;
  } else {
    return false;
  }
} 

export const readContent = (dir) => {
  let doc
  try {
    doc = yaml.safeLoad(fs.readFileSync(dir + '/content.yml'));
    return {'error': null, 'doc': doc};
  } catch (e){
    console.log('error');
    console.log(e);
    return {'error': e, 'doc': null};
  }
}

export const validateInventory = (inv) => {
  console.log('check if ok');
  console.log(inv);
} 
