
//
// chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
//     if (response.time){
//         //const time = new Date(response.time);
//         const time = response.time
//         startTimer(time)
//
//         //setInterval(document.getElementById('link').innerHTML = response.time, 1000)
//         }
// });

function startTimer(time){
                document.getElementById("link").innerHTML = time
            }


function startTime(time){
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when : time});
    document.getElementById('link').innerHTML = time;
}


document.getElementById("clickme").addEventListener('click', function(){
    startTime();
})



function globaltime(){
    chrome.storage.local.get(['sec'], function(result){

        //alert(result.sec +" seconds")
    });
}

var x = setInterval(function(){
        chrome.storage.local.get(['min','sec'], function(result){
            document.getElementById("link").innerHTML = result.min +"minutes" + result.sec + "seconds";
        })},500)




