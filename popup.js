
blocktest = []
var turnOn = false;
var removeSite;
var newUrlList;

var selectList = [];
var show = document.getElementById("link").style.display;
var displayTime;




chrome.storage.local.set({onOff: false}, function(){
});

function startTimer(time){
                document.getElementById("link").innerHTML = time

            }


function startTime(time){
    chrome.runtime.sendMessage({ cmd: 'START_TIMER', when : time});
    document.getElementById('link').innerHTML = time;
    chrome.storage.local.set({displayTime: true})
    document.getElementById('link').style.visibility = "none";

}



//Listeners******
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
    turnOn = true;
})

document.getElementById('poweron').addEventListener('click', function(){

    chrome.storage.local.get(['onOff'], function(result){
        alert(result.onOff);
        if(result.onOff === true){
        }
        if(result.onOff === false){
            document.getElementById('wrap').style.display = 'none';
            alert(result.onOff + "result")
            chrome.runtime.reload();
        }
    });
})
//

//Functions*****
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
        var myUrls = result.block || ["*://www.whatever.com/*"];
        var select = document.getElementById('websites');
        var alreadySelect = document.getElementById('websites').options;
        var length = select.options.length;
        for(w = 0; w < length; w ++){
            select.options[w] = null;
        }
        for(var z = 0; z < myUrls.length; z++){
            var opt = myUrls[z];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            el.id = "removal";
            el.tagName = opt;
            selectList.push(opt);
            select.appendChild(el);
/*            for(var y = 0; y < myUrls.length; y++ ){
                if(selectList[y] !== myUrls[z]){
                    var el = document.createElement("option");
                    el.textContent = opt;
                    el.value = opt;
                    el.id = "removal";
                    el.tagName = opt;
                    selectList.push(opt);
                    select.appendChild(el);
                    return;
                }

                if(selectList[y] === myUrls[z]){
                    return;
                }
            }*/
        }
    })
}

if(turnOn === true){
    remove();
}

function removeAllElements(array, elem) {
    var index = array.indexOf(elem);
    while (index > -1) {
        array.splice(index, 1);
        index = array.indexOf(elem);
    }
}

const selectElement = document.querySelector('.websites');

document.getElementById("submit").addEventListener('click', function(){
    var testing = document.getElementById('websites').value;
    alert(testing);
    chrome.storage.local.get('block', function(result){
        var theList = result['block'];
        alert(theList+ "I AM THELIST");
        alert(testing + "REMOVING ME");
        if(theList.includes(testing)){
            alert("SHIT");
            var newUrlList = theList.filter(function(item){
                if(item!== testing){
                    alert("FOUND A GOOD ONE");
                }
                return item !== testing;

            });
            alert(newUrlList + "I AM NEWURLLIST")
            chrome.storage.local.set({ 'block': newUrlList});
            alert(newUrlList + "SET NEW URL LIST");
            chrome.runtime.reload();
        }
        var myUrls = result.block || ["*://www.whatever.com/*"];
    })
})

function containsObject(obj, list){
    var h;
    for (h = 0; h < list.length; h++){
        if(list[h] === obj){
            return true;
        }
    }
    return false;
}

function validateForm(){
    var uInput = document.getElementById('myText').value;
    if( uInput === ""){
        alert("You didn't enter a website!")
        return 0;
    }
}

function clearSelection(){
    var uInput = document.getElementById('myText').value;
    if(document.getElementById('myText').value === "Type here"){
        document.getElementById('myText').value = "";
    }
}
