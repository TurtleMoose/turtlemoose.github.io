//make the dark mode button an even circle
document.getElementById("darkbutton").style.height = document.getElementById("darkbutton").offsetWidth+"px";
//some goofy stuff with the logo
//dark mode detector
if (window.matchMedia) {const query = window.matchMedia('prefers-color-scheme: dark');}
let isDarkMode = () =>window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if(isDarkMode){isDarkMode=1;}else{isDarkMode=0;}
darkcheck();
//i don't know
function darkcheck(){
    if(isDarkMode){
        document.getElementById("header").style.backgroundColor = "#242424";
        document.getElementById("headerimgdark").style.opacity = 100;
        document.getElementById("headerimglight").style.opacity = 0;
        document.getElementById("edgeL").style.backgroundColor = "#242424";
        document.getElementById("edgeR").style.backgroundColor = "#242424";
        document.getElementById("darkbutton").src="imgs/dark/dark.png"
        document.getElementById("bibase").style.backgroundColor = "#242424";
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.border = "5px solid rgb(0,0,0,0)";
            document.getElementById("button"+i).style.color = "#B8B8B8";
        }
    }else{
        document.getElementById("header").style.backgroundColor = "white";
        document.getElementById("headerimgdark").style.opacity = 0;  //  oh good
        document.getElementById("headerimglight").style.opacity = 100;//more bull
        document.getElementById("edgeL").style.backgroundColor = "white";
        document.getElementById("edgeR").style.backgroundColor = "white";
        document.getElementById("darkbutton").src="imgs/light/light.png"
        document.getElementById("bibase").style.backgroundColor = "white";
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.border = "5px solid rgb(0,0,0,0)";
            document.getElementById("button"+i).style.color = "black";
        }
    }//this is all crap
    document.querySelector("#badidea1").classList.toggle("badideadark");
    document.querySelector("#badidea2").classList.toggle("badideadark");
    document.querySelector("#badidea3").classList.toggle("badideadark");
}
//something something html buttons
function makeitdark(){
    if(isDarkMode){
        isDarkMode = false;
    }else{
        isDarkMode = true;
    }
    darkcheck();
}
//header scrolling
//yes, this has to be here. Otherwise the header freaking
//kills itself if the page loads at 0,0. Absolute BS.
document.getElementById("header").style.fontSize = "100%";
document.getElementById("header").style.height = "80px";
document.getElementById("buttonbox").style.top = "0px";
document.getElementById("headerimglight").style.height="80px";
document.getElementById("headerimgdark").style.height="80px";
for(var i=1;i<5;i++){
    document.getElementById("button"+i).style.height = "50px";
    document.getElementById("button"+i).style.paddingTop = "15px";
    document.getElementById("button"+i).style.top = "2px";
//    document.getElementById("button"+i).style.borderRadius = "25px";
}
//I think if it scrolls, it calls that function.
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
        //if scrolled down past 37px
        document.getElementById("header").style.fontSize = "100%";
        document.getElementById("header").style.height = "50px";
        document.getElementById("buttonbox").style.top = "-9px";//no i don't know freaking why
        document.getElementById("headerimgdark").style.height="50px";
        document.getElementById("headerimglight").style.height="50px";
        //is it even worth making a loop here
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.height = "36px";
            document.getElementById("button"+i).style.paddingTop = "0px";
            document.getElementById("button"+i).style.top = "11px";
          //  document.getElementById("button"+i).style.borderRadius = "20px";
        }//i guess so
    }else{//oh lord help me this is going on an live site soon
        //if not scrolled down
        document.getElementById("header").style.fontSize = "100%";
        document.getElementById("header").style.height = "80px";
        document.getElementById("buttonbox").style.top = "0px";
        document.getElementById("headerimglight").style.height="80px";
        document.getElementById("headerimgdark").style.height="80px";
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.height = "50px";
            document.getElementById("button"+i).style.paddingTop = "15px";
            document.getElementById("button"+i).style.top = "2px";
           // document.getElementById("button"+i).style.borderRadius = "25px";
        }
    }
}//christ thats ugly but it works
