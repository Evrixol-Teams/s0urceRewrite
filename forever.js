/*
const forever = require('forever-monitor');

var child = new (forever.Monitor)('index.js', {
  'silent': false,
  'killTree': true,
  'outFile': __dirname + '/logs/logs.log',
  'errFile': __dirname + '/logs/errors.log'
});

child.on('restart:code', function(code) {
  console.error(`script exited with code ${code}, restarting for the ${child.times}th time...`);
});

child.on('exit:code', function(code) {
  //var time = new Date().getTime();
  console.error(`[${new Date()}]script exited with code ${code}`);
});

child.start();
*/
//assuming that this is the file that runs.. it's gonna run index.js right? ok I see I also have to put logs.. hmm ok
//ok I just finished :D

let fs=require('fs')
let startDate=new Date()+'', count=0
let {spawn}=require('child_process')
let slash=process.platform=="win32"?"\\":"/"
let err=__dirname+slash+"logs/errors.log"
let out=__dirname+slash+"logs/logs.log"
async function exec(command){
  return await new Promise(resolve=>{
    let options={stdio:'pipe',env:process.env,cwd:undefined,shell:true} //stdio 'pipe' not 'inherit'
    let myChild=spawn(command,options)
    function handleStd(dir){ //handle stdout and stderr
      return function(data){
        console.log(data+'') //for dev to see
        let time=new Date()-0 //primary key for logs xD
        var {readFileSync,writeFileSync}=fs
        var obj=JSON.parse(readFileSync(dir))
        if(!obj[time]){obj[time]=[data+'']}
        else{obj[time].push(data+'')}
        writeFileSync(dir,JSON.stringify(obj,null,'\t'))
      }
    }
    myChild.stderr.on('data',handleStd(err)) //error log
    myChild.stdout.on('data',handleStd(out)) //output log
    myChild.on('close',resolve) //when child process ends
  })
}
function run(){
  setTimeout(async()=>{
    try{var code=await exec("node index.js")}
    catch(err){console.warn(err);process.exit(0)}
    console.warn(`Closed with error code:${code}\nThis is restart number ${1+(count++)} since ${startDate}`)
    run() //recursive function >:D
  },5e3)
}
run()