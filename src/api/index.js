const fs = require('fs')
const os = require('os')
const yaml = require('js-yaml');
const ini = require('ini');
const { app } = require('electron').remote;

export const initInventory = () => (
  {
    hostname: os.hostname(),
    ip: '127.0.0.1',
    isValid: null
  }
)

export const validateDirectory = (dir) => {
  if (fs.existsSync(`${dir}/content.yml`)) {
    return true;
  } else {
    return false;
  }
} 

export const readContent = (dir) => {
  let doc
  try {
    doc = yaml.safeLoad(fs.readFileSync(`${dir}/content.yml`));
    return {'error': null, 'doc': doc};
  } catch (e){
    return {'error': e, 'doc': null};
  }
}

export const validateInventory = (inv) => {
  if (inv.hostname && inv.ip){
    return {isValid: true, error: null};
  } else {
    return {isValid: false, error: 'All fields are mandatory'};    
  }

}

export const writeInventory = ( inv, directory ) => {
  let dir = directory || app.getPath('home') + '/.deploy';
  if (! fs.existsSync(`${dir}`)){
    fs.mkdirSync(dir, 0774);
  }
  fs.writeFileSync(`${dir}/inventory', ini.stringify(inv));
} 
