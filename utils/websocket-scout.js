//websocket hijacker 5000
//you must be navigated to s0urce.io already
var myWindow=window.open(location.href)
const myWebSocket=myWindow.WebSocket
myWindow.MessageEvent
.prototype.preventDefault=
function(){this.defaultPrevented=true}
var ws=null; var arr=[]
myWindow.WebSocket=function(){
  let c=new myWebSocket(...arguments)
  const send=c.send; ws=c
  function myDefaultHandler(msg){
    this.send=send
    arr.push({clientMsg:msg})
    console.log({clientMsg:msg}) //for you to see
    let toReturn=this.send(...arguments)
    this.send=myDefaultHandler
    return toReturn
  }
  c.send=myDefaultHandler
  c.addEventListener("message",(msg)=>{
    arr.push({serverMsg:msg})
    console.log({serverMsg:msg.data}) //for you to see
  })
  return c
}
//ws is websocket, arr is list of messages