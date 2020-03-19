window.onload = function(){


    name = prompt("Welcome, what's your name?");
    localStorage.setItem("storagename", name);

    storagename = localStorage.getItem("storagename");
    

    updateTime;
    btnsRange = document.getElementsByClassName("btn");
    document.getElementById("welcome").innerHTML = "Welcome, " + storagename;
    colorCheck();
    btnTextColor();
    randomBtn();
    browser();

}



var name;
var now;
var btnsRange;
var storagename


var updateTime = setInterval(()=>{
    now = moment().format('hh:mm:ssA');
    document.getElementById("clock").innerHTML = now

},1000);

function browser(){
    if (navigator.userAgent.indexOf("Chrome") != -1 ) {
        document.getElementsByTagName("header")[0].style.backgroundColor = "black";
      }
    else if (navigator.userAgent.indexOf("Firefox") != -1 ) {
        document.getElementsByTagName("header")[0].style.backgroundColor = "orange";
      }
    else if (navigator.userAgent.indexOf("MSIE") != -1 ) {
        document.getElementsByTagName("header")[0].style.backgroundColor = "blue";      
    }


}

function colorCheck(){
    
    for(let i=0 ; i<btnsRange.length; i++){
        btnsRange[i].addEventListener("click", function(){
            document.body.style.backgroundColor = btnsRange[i].innerHTML;

        })
    }

}
function randomBtn(){
    document.getElementById("random").addEventListener("click", function(){
        document.body.style.backgroundColor = 'rgb(' + (Math.floor(Math.random()*255)+1) + ',' + (Math.floor(Math.random()*255)+1) + ',' + (Math.floor(Math.random()*255)+1) + ')';

    })

}

function btnTextColor(){
    for(let i=0 ; i<btnsRange.length; i++){
        if(btnsRange[i].innerHTML == 'Randomize'){
            btnsRange[i].style.color='whitesmoke';
        }
        else{
            btnsRange[i].style.color=btnsRange[i].innerHTML;

        }
    }

}




    

