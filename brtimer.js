
var CountDown = new Date();
var WorkTime = CountDown.setMinutes(CountDown.getMinutes() + 25);
var x = setInterval(function() {
    var current_date = new Date().getTime();

    // Calculate Seconds Left
    var distance = (WorkTime - current_date);

    //calculate minutes left
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //alert(minutes)
    //alert(seconds)

    //display
    var test;

    function timer(){
        document.getElementById("link").innerHTML = minutes + "m " + seconds + "s " + "hi";
    }
    document.getElementById("clickme").addEventListener("click", function(){
        document.getElementById("link").innerHTML = minutes + "m " + seconds + "s ";
    })
    //document.getElementById("clickme").onclick = timer;

    //var test = document.getElementById("link").innerHTML = minutes + "m " + seconds + "s ";
    //document.getElementById("link").innerHTML = test;



    //Finish
    if (distance < 0){
        clearInterval(x);
        document.getElementById("link").innerHTML = "EXPIRED";
    }
}, 1000)



// function timer(){
//     document.getElementById("link").innerHTML = minutes + "m " + seconds + "s " + "hi";
// }
