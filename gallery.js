window.onload = function(){
smallImg = document.getElementsByClassName("small");
bigImg = document.getElementById("big");
clickedImg = document.getElementById("big");
changeImg();
flag = false;

//welcome message
storagename = localStorage.getItem("storagename");
document.getElementById("welcome").innerHTML = "Welcome, " + storagename;
}


var smallImg;
var bigImg;
var clickedImg;
var flag;
var storagename;

function changeImg(){
    
    for(let i=0 ; i<smallImg.length; i++){
       
        
        
        smallImg[i].addEventListener("click", function(){

            for(let j=0 ; j<smallImg.length; j++){
                smallImg[j].style.border = "0px solid yellow";
    
            }

            this.style.border = "2px solid yellow";
            bigImg.src = this.src;
            clickedImg = this;
            flag = true;
        })
        smallImg[i].addEventListener("mouseover", function(){
            
            bigImg.src = this.src;

        })
        smallImg[i].addEventListener("mouseleave", function(){
            if(flag){
                bigImg.src = clickedImg.src;
            }
            else bigImg.src = document.getElementById("default").src;

            

        })

        

        
    }

}