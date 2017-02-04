var sessionTime = 2;
var breakTime = 2;
var currentSessionTimer = 0; // in seconds
var currentBreakTimer = 0; // in seconds
var paused = true;
var onSession = false;
var counter = 0;
var reset = true;
var helpShown = false;

function toggleTimer(){
  if(!helpShown){
    helpShown = true;
    $('#help-msg').animate({
      opacity: 1,
      bottom: "+=50px"
    },1100);
  }
  sessionTime = $('#session-min').html();
  breakTime = $('#break-min').html();
  if(!paused){
    paused = true;
    $('#status-msg').html('Timer paused.');
    $('#status-msg').css('color', '#000000');
  } else {
    paused = false;
    if(onSession){
      $('#status-msg').html('Working session! Do your thing!');
      $('#status-msg').css('color', '#307bbb');
    } else {
      $('#status-msg').html('Break time! Good job, go on, you\'ve earned it!');
      $('#status-msg').css('color', '#4db53c');
    }
    timerTick();
  }
}

function timerTick(){
  if(paused) return;
  if(reset){
    reset = false;
    onSession = true;
    currentSessionTimer = sessionTime * 60; //initialize session time
    currentBreakTimer = 0;
    $('#status-msg').html('Working session! Do your thing!');
    $('#status-msg').css('color', '#307bbb');
    $('.c100').removeClass('green');
    timerTick();
  }
  else if(currentSessionTimer === 0 && currentBreakTimer === 0){
    onSession = !onSession;
    if(onSession){
      if(currentSessionTimer === 0) currentSessionTimer = sessionTime * 60; //initialize session time
      $('.c100').removeClass('green');
      $('#status-msg').html('Working session! Do your thing!');
      $('#status-msg').css('color', '#307bbb');
    } else {
      if(currentBreakTimer === 0) currentBreakTimer = breakTime * 60; //initialize break time//update progress circle
      $('.c100').addClass('green', 500);
      $('#status-msg').html('Break time! Good job, go on, you\'ve earned it!');
      $('#status-msg').css('color', '#4db53c');
    }
    timerTick();
  }
  else if(onSession){
    var m = Math.floor(currentSessionTimer/60);
    var s = currentSessionTimer - (m*60);
    if(m.toString().length < 2) m = '0' + m;
    if(s.toString().length < 2) s = '0' + s
    var output = m + ':' + s;
    $('#current-time').html(output);

    //update progress circle
    $('.c100').removeClass('p'+counter);
    counter = Math.floor(((sessionTime * 60) - currentSessionTimer) / (sessionTime * 60) * 100);
    $('.c100').addClass('p'+counter);

    setTimeout(function(){
      currentSessionTimer--;
      timerTick();
    }, 1000);
  } else if (!onSession){
    var m = Math.floor(currentBreakTimer/60);
    var s = currentBreakTimer - (m*60);
    if(m.toString().length < 2) m = '0' + m;
    if(s.toString().length < 2) s = '0' + s
    var output = m + ':' + s;
    $('#current-time').html(output);

    //update progress circle
    $('.c100').removeClass('p'+counter);
    counter = Math.floor(((breakTime * 60) - currentBreakTimer) / (breakTime * 60) * 100);
    $('.c100').addClass('p'+counter);

    setTimeout(function(){
      currentBreakTimer--;
      timerTick();
    }, 1000);
  }
}

function startTimer(){
  alert('startTimer called');
  paused = false;
  timerTick();
}
function stopTimer(){
  alert('stoptimer called');
  paused = true;
}

function updateUI(){
  reset = true;
  $('#session-min').html(sessionTime);
  $('#break-min').html(breakTime);

  var x = sessionTime * 60; //temporary variable just to initialize the view
  var m = Math.floor(x/60);
  var s = x - (m*60);
  if(m.toString().length < 2) m = '0' + m;
  if(s.toString().length < 2) s = '0' + s
  var output = m + ':' + s;
  $('#current-time').html(output);

}
function decrSession(){
  if(!paused) return;
  if(sessionTime == 1) return;
  sessionTime--;
  updateUI();
}
function incrSession(){
  if(!paused) return;
  if(sessionTime == 60) return;
  sessionTime++;
  updateUI();
}
function decrBreak(){
  if(!paused) return;
  if(breakTime == 1) return;
  breakTime--;
  updateUI();
}
function incrBreak(){
  if(!paused) return;
  if(breakTime == 60) return;
  breakTime++;
  updateUI();
}

$(document).ready(function() {
  updateUI();
  $('.c100').click(toggleTimer);
  $('#btn-session-decr').click(decrSession);
  $('#btn-session-incr').click(incrSession);
  $('#btn-break-decr').click(decrBreak);
  $('#btn-break-incr').click(incrBreak);

});