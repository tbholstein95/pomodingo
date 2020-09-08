
blocktest = []
var turnOn = false;
var removeSite;
var newUrlList;

var selectList = [];

chrome.storage.local.set({onOff: false}, function(){
});
//document.getElementById('wrap').style.display = 'none';
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


document.getElementById("clickList").addEventListener('click',function(){

    if(validateForm() === 0){
        return;
    }
    else{
        addToList();
    }

    //alert(userBlock);
})

document.getElementById('myText').addEventListener('click', function(){
    clearSelection();
})

document.getElementById("websites").addEventListener('click',function(){
    getList();
    //alert("clicked me!");
    //alert(userBlock);
    turnOn = true;
})

document.getElementById('poweron').addEventListener('click', function(){

    chrome.storage.local.get(['onOff'], function(result){
        alert(result.onOff);
        if(result.onOff === true){
            /*document.getElementById('wrap').style.display = 'block';
            chrome.storage.local.set({onOff: true})*/
        }
        if(result.onOff === false){
            document.getElementById('wrap').style.display = 'none';
            alert(result.onOff + "result")
            chrome.runtime.reload();

        }
    });

})


function addToList(){
    var userBlock = document.getElementById("myText").value;
    //blocktest.push(userBlock)
    chrome.runtime.sendMessage({method: "adding", ub: userBlock});
    //alert(userBlock + "popup.js alert");
}

// function globaltime(){
//     chrome.storage.local.get(['sec'], function(result){
//
//         //alert(result.sec +" seconds")
//     });
// }

var x = setInterval(function(){
        chrome.storage.local.get(['min','sec'], function(result){
            document.getElementById("link").innerHTML = result.min +"minutes" + result.sec + "seconds";
        })},500)


function getList(){
    chrome.storage.local.get('block', function(result){
        var myUrls = result.block || ["*://www.whatever.com/*"];
        var select = document.getElementById('websites');
        var alreadySelect = document.getElementById('websites').options;



            for(var z = 0; z < myUrls.length; z++){
                var opt = myUrls[z];



                for(var y = 0; y < myUrls.length; y++ ){
                    //alert(document.getElementById("websites").options[z].text)
                    if(selectList[y] !== myUrls[z]){
                        var el = document.createElement("option");
                        el.textContent = opt;
                        el.value = opt;
                        el.id = "removal";
                        el.tagName = opt;
                        //alert(opt + "opt");
                        selectList.push(opt);
                        select.appendChild(el);
                        //alert(el.textContent);
                        return;
                    }

                    if(selectList[y] === myUrls[z]){

                        return;
                    }


                }

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

/*selectElement.addEventListener('change', (event) =>{
    var removeSite = document.getElementById('websites').textContent;

    })*/

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
            chrome.storage.local.set({ 'block:': newUrlList});
            alert(newUrlList);
            chrome.runtime.reload();
        }



        var myUrls = result.block || ["*://www.whatever.com/*"];

    })
})

/*document.getElementById("removal").addEventListener("change",function(){
    const result = document.querySelector()
    var temp = this.tagName;
    alert("HELLO");
    chrome.storage.local.get('block', function(result){
        var myUrls = result.block || ["*://www.whatever.com/!*"];
        removeAllElements(myUrls, temp);
        block().urls.remove(temp);
        document.getElementById('submit').addEventListener("click", function(){
            alert(temp + " HELL YEA");

        })


    })}, false)*/



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
