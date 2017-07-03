var fs=require('fs');
const ini = require('ini');
const dir='/Users/pierre';

const writeInventory = ( inv, directory ) => {
  let dir = directory || '/Users/pierre' + '/.deploy';
  if (! fs.existsSync(`${dir}`)){
    fs.mkdirSync(dir, 0774);
  }
  fs.writeFileSync(`${dir}/inventory`, `[xone]\n${inv.hostname}  ${inv.ip} ansible_connection=local\n`);
} 

const readInventory = () => {
  let dir = '/Users/pierre/.deploy';
  if (fs.existsSync(`${dir}/inventory`)){
    let filecontent = fs.readFileSync(`${dir}/inventory`,'utf-8');
    let lines = filecontent.split('\n');
    console.log(lines[0]);
    let currentGroup=null;
    let groups = {};
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
    console.log(groups);
    console.log(groups.xone[0]);
    let elements=groups.xone[0].split(/[ ]+/);
    console.log(elements[1]);
  } else {
    console.log('not exist');
  }
}


/*
let inv = {'hostname': 'evs-rv-pg01','ip': '172.23.1.12'}
try {
 writeInventory(inv);
}
catch (e){
 console.log('oups');
 console.log(e);
}
*/
readInventory();

