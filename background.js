
//Start Timer
var a = 0;
var b = 0;
var x = function (details) {
    return {cancel : true};
};
var i = 0;

var sites = [];
var list =[]
var sitesLength = sites.length;
var select = document.getElementById('websites');


//mp3
var startAlarm = new Audio();
startAlarm.src ="get-outta-here.mp3";
var breakAlarm = new Audio();
breakAlarm.src ="done-for-you.mp3";


function myLoop() {
    block()
    setTimeout( function(){
        alertfunc();
        chrome.webRequest.onBeforeRequest.removeListener(x);
        i++;
        if (i < 2 ) {
            setTimeout(myLoop, 5000);
        }
        if (i >= 2){
            setTimeout(longBreak, 5000)
        }
        a += 1
    }, 5000)
}

function longBreak(){
    block()
    setTimeout(function(){
        longannounce();
        chrome.webRequest.onBeforeRequest.removeListener(x);
        i = 0;
        if( i < 2){
            setTimeout(myLoop, 10000)
        }
    }, 5000)
}

function alertfunc(){
    breakAlarm.play();
    alert("Break Time")
}

function worktime(){
    startAlarm.play();
    alert("Work Time!")
}

function longannounce(){
    alert("Long Break!")
}

function work(){
    setTimeout(worktime, 5000);
}

function block(){
    worktime();

    chrome.storage.local.get('block', function(result){
        var myUrls = result.block || ["*://www.whatever.com/*"];
        chrome.webRequest.onBeforeRequest.addListener(
            x,
            {urls: myUrls},
            ["blocking"])
        }
    )}

function unblock(){
    alertfunc();
    chrome.webRequest.onBeforeRequest.removeListener(x);
}

function unblockLong(){
    alertLongBreak();
    chrome.webRequest.onBeforeRequest.removeListener(x);
}

function alertLongBreak(){
    alert('Long Break!')
}

let CountDown;
let WorkTime;
let distance;
var minutes;
var seconds;
var timerTime;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    if(request.cmd === 'START_TIMER'){
        setinter();
    }
    else if (request.cmd === 'GET_TIME'){
        chrome.storage.local.get(['sec'], function(result){
            sendResponse({ time: result.sec })
        });
        return true;
    }
})

chrome.runtime.onMessage.addListener(function(request, message){
        if(request.method === "adding"){
            var data = request.ub;
            var s = '*://www.'+data.toString()+'.com/*';
            if(sites.includes('*://www.'+data.toString()+'.com/*')){
                alert("Already Added");
                return
            }
            sites.push( '*://www.'+data+'.com/*');
            chrome.storage.local.set({block: sites}, function(){

                alert("saved" + '*://www.'+data+'.com/*');
            });
        }
});

function store(){
    chrome.storage.local.set({min:  minutes}, function() {
        console.log("you saved me!");
    });
}

function getminutes(){
    chrome.storage.local.get(['min'], function(result){
        if (result.min === undefined) {
            console.log("I am retrieved");
        }
    });
}

function setTimer() {
    block();
    CountDown = new Date();
    WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 1);
    return new Promise(resolve =>{var t = setInterval(function () {
        genSetTime(resolve, t);
    }, 1000)})
}

function setBreak() {
    CountDown = new Date();
    WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 1);
    unblock();
    return new Promise(resolve => {var t = setInterval(function () {
        genSetTime(resolve, t);

    }, 1000)})
}

function setLongBreak(){
    CountDown = new Date();
    WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 2);
    unblockLong();
    return new Promise(resolve => {var t = setInterval(function () {
        genSetTime(resolve, t);
    }, 1000)})
}

async function setinter(){
    var count = 0;
    do{
        if(count === 0 || count === 2 || count === 4 || count === 6){
            await setTimer();
            count += 1;
            alert(count);
        }
        if (count === 1 || count === 3 || count === 5){
            await setBreak();
            count +=1;
            alert(count);
        }
        if(count === 7){
            await setLongBreak();
            count = 0;
        }
    }
    while(count < 8);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'needData') {
        sendResponse(sites)
    }
    })
}

function genSetTime(resolve, setInt){
    var current_date = new Date().getTime();

    // Calculate Seconds Left
    var distance = (WorkTime - current_date);

    //calculate minutes left
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);

    chrome.storage.local.set({'min': minutes}, function () {
        console.log("you saved me!");
    });

    chrome.storage.local.set({'sec': seconds}, function () {
        console.log("you savedssec!");
    });

    //Finish
    if (distance <= 0) {
        count = 0;
        clearInterval(setInt);
        resolve("finish")
    }
}

