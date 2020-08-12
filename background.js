//Start Timer
var a = 0;
var b = 0;
var x = function (details) {
    return {cancel : true};
};
var i = 0;

// var CountDown = new Date();
// var WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 25);


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
    alert("Break Time")
}

function worktime(){
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
    chrome.webRequest.onBeforeRequest.addListener(
        x,
        {urls: ["*://www.facebook.com/*"]},
        ["blocking"]);
}

function unblock(){
    alertfunc();
    chrome.webRequest.onBeforeRequest.removeListener(x);
}
var test;

let CountDown;
let WorkTime;
let distance;
var minutes;
var seconds;
var timerTime;
chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    if(request.cmd === 'START_TIMER'){
        CountDown = new Date();
        WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 25);
        block();
        setInterval(function() {
            var current_date = new Date().getTime();

            // Calculate Seconds Left
            var distance = (WorkTime - current_date);

            //calculate minutes left
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

            chrome.storage.local.set({'min':  minutes}, function() {
                console.log("you saved me!");
            });

            chrome.storage.local.set({'sec':  seconds}, function() {
                console.log("you savedssec!");
            });

            //Finish
            if (distance < 0){
                clearInterval();
                document.getElementById("link").innerHTML = "EXPIRED";
            }



        }, 1000)
    }
    //todo change the if and else if to own things
    else if (request.cmd === 'GET_TIME'){
        chrome.storage.local.get(['sec'], function(result){

            //alert(result.sec +" seconds")
            sendResponse({ time: result.sec })
        });
        return true;


    }
})

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
//     if(request.cmd === 'GET_TIME'){
//         chrome.storage.local.get(['sec'], function(result){
//             alert(result.sec +" seconds")
//         });
//     }
// })


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


// function t(){
//      setInterval(function() {
//         var current_date = new Date().getTime();
//
//         // Calculate Seconds Left
//         var distance = (WorkTime - current_date);
//
//         //calculate minutes left
//         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//
//         //display
//
//
//         // function timer(){
//         //     document.getElementById("link").innerHTML = minutes + "m " + seconds + "s " + "hi";
//         // }
//         // document.getElementById("clickme").addEventListener("click", function(){
//         //     document.getElementById("link").innerHTML = minutes + "m " + seconds + "s ";
//         // })
//         // document.getElementById("clickme").onclick = timer;
//         //
//         // var test = document.getElementById("link").innerHTML = minutes + "m " + seconds + "s ";
//         // document.getElementById("link").innerHTML = test;
//
//         //Finish
//         if (distance < 0){
//             clearInterval(t);
//             document.getElementById("link").innerHTML = "EXPIRED";
//         }
//
//         document.getElementById("link").innerHTML = minutes + "m " + seconds + "s " + "hi";
//     }, 1000)
//
// }

//myLoop();


