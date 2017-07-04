const fs = require('fs')
const os = require('os')
const yaml = require('js-yaml');
const { app } = require('electron').remote;


export const initInventory = () => {
  let groups = readInventoryFromFile();
  if (groups.xone){
    let line = groups.xone[0];
    let elements=groups.xone[0].split(/[ ]+/);
    return {
      hostname: elements[0], 
      ip: elements[1],
      isValid: null
    }
  } else {
    return {
        hostname: os.hostname(),
        ip: '127.0.0.1',
        isValid: null
    }
  }
}

const readInventoryFromFile = () => {
  let dir = app.getPath('home') + '/.deploy';
  let groups = {};
  if (fs.existsSync(`${dir}/inventory`)){
    console.log(`got file ${dir}/inventory`);
    let filecontent = fs.readFileSync(`${dir}/inventory`,'utf-8');
    let lines = filecontent.split('\n');
    let currentGroup=null;
    let hostInGroup=[];
    lines.forEach((l,idx)=>{
      if (l[0] === '['){
        if (currentGroup){
          // terminate the group
          groups[currentGroup]=hostInGroup;
        }
        currentGroup = l.substr(1).slice(0, -1);
        hostInGroup = [];
      } else {
        if (l.length > 1){
          hostInGroup.push(l);
        }
      }
    });
    groups[currentGroup]=hostInGroup;
  } else {
    console.log(`no file ${dir}/inventory`);
  }
  return groups;
}

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

export const writeInventory = ( inv, dir ) => {
  if (! fs.existsSync(`${dir}`)){
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`${dir}/inventory`, `[xone]\n${inv.hostname} ansible_host=${inv.ip} ansible_connection=local\n`);
} 