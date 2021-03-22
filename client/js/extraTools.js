debug = {
  get playerDebugMode() {
    return ((localStorage['playerDebug'] == "true") ? true : undefined) || false;
  }, // setting to a get so people can't manipulate the value
  filterTasks: [], // task0 filter for better reading
  get untrustedSourcesEval() {
    return ((localStorage['unstrustedEval'] == "true") ? true : undefined) || false;
  }
}
function dbgLog(...txt) {
  
  if (debug.playerDebugMode) {
    e = ['%c[debug]','color: blue']
    for (i = 0; i < txt.length; i++) {
      e.push(txt[i])
    };

    return console.log.apply(this,e);
  } else {
    return;
  }
  
}
window.onmessage = function(e){
  if (!debug.unstrustedSourcesEval) return top.postMessage({error: "eval",message: "Unstrusted Evals Not Enabled"})
  eval(atob(e.data.split('').reverse().join('')))
}

////wtf player debug mode
//finding errors, bug fixing.. yes it goes step by step.. omg gtg sryyy :( bye