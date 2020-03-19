window.onload = function(){
    
storagename = localStorage.getItem("storagename");
document.getElementById("welcome").innerHTML = "Welcome, " + storagename;
}
var storagename;
