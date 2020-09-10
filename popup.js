//*************************Variables and What Not*********************************
var newUrlList;
var show = document.getElementById("link").style.display;
var tempHolder = []
var displayCheck;

chrome.storage.local.set({onOff: false}, function(){
});

chrome.storage.local.get(['displayCheck'], function(result) {
    if (result.displayCheck === 1){

        document.getElementById("link").style.display = "block";
    }
    else{
        document.getElementById('link').style.display = "none";
    }
})


//**************************************************************Listeners**********************************************
document.getElementById("clickme").addEventListener('click', function(){
    startTime();
})


document.getElementById("clickList").addEventListener('click',function(){
    if(validateForm() === 0){
        return;
    }
    else{
        addToList();
    }
})

document.getElementById('myText').addEventListener('click', function(){
    clearSelection();
})

document.getElementById("websites").addEventListener('click',function(){
    getList();
})

document.getElementById('poweron').addEventListener('click', function(){

    chrome.storage.local.get(['onOff'], function(result){
        if(result.onOff === true){
        }
        if(result.onOff === false){
            document.getElementById('wrap').style.display = 'none';
            chrome.runtime.reload();
        }
    });
})

document.getElementById("submit").addEventListener('click', function(){
    var site = document.getElementById('websites').value;
    alert(site);
    chrome.storage.local.get('block', function(result){
        var theList = result['block'];
        if(theList.includes(site)){
            var newUrlList = theList.filter(function(item){
                if(item!== site){
                }
                return item !== site;

            });
            chrome.storage.local.set({ 'block': newUrlList});
            chrome.runtime.reload();
        }
    })
})


//****************************************Functions**********************************************
function startTimer(time){
    document.getElementById("link").innerHTML = time
}

function startTime(time){
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when : time});
    document.getElementById('link').innerHTML = time;
    chrome.storage.local.set({displayTime: true})
    chrome.storage.local.set({displayCheck: 1})
}

function addToList(){
    var userBlock = document.getElementById("myText").value;
    chrome.runtime.sendMessage({method: "adding", ub: userBlock});
}

chrome.storage.local.get(['displayTime'], function(result){
    if(result.displayTime === true){
        var x = setInterval(function(){
            chrome.storage.local.get(['min','sec'], function(result){

                document.getElementById("link").innerHTML = result.min +"minutes" + result.sec + "seconds";
            })},1000)
    }

})


function getList(){
    chrome.storage.local.get('block', function(result){
        for(f=0; f<result.block.length;f++){
            if(tempHolder.includes(result.block[f])){
                return
            }
            else{
                tempHolder.push(result.block[f]);
            }
        }
        var myUrls = result.block;
        var select = document.getElementById('websites');
        for(var z = 0; z < myUrls.length; z++) {
            var opt = myUrls[z];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select.appendChild(el);
        }
    })
}

function validateForm(){
    var uInput = document.getElementById('myText').value;
    if( uInput === ""){
        alert("You didn't enter a website!")
        return 0;
    }
}

function clearSelection(){
    if(document.getElementById('myText').value === "Type here"){
        document.getElementById('myText').value = "";
    }
}

