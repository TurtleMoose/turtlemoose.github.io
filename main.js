//products list
let allproducts = [];
//product class (there's so many whyyyy)
class product {
    constructor(name, price, brand, model, size, cpu, gpu, storage, storagetype, ramgb, ramx, ramspeed, ramtype, os, img){
        //i think this is self explanitory and also I really don't care
        this.name = name; this.price = price; this.brand = brand; this.model = model; this.size = size;
        this.cpu = cpu; this.gpu = gpu; this.storage = storage;//in gigabytes please
        this.storagetype = storagetype; this.ramgb = ramgb; this.ramx = ramx;//ex. 2x8
        this.ramspeed = ramspeed; this.ramtype = ramtype; this.os = os; this.img = img;
        allproducts.push(this);
    }
}
//basically just shove crap here until I set up a database
const hpcompaq = new product("chee", 80, "HP", "Compaq 4000", "SFF", "Intel Pentium E6700 3.20GHz", "AMD Radeon HD 7570", 
                             300, "HDD", 8, "2x4", "1333", "DDR3", "Windows 10", "temp.png");
const hpcompa1 = new product("4000", 80, "HP", "Compaq 4000", "SFF", "Intel Pentium E6700 3.20GHz", "AMD Radeon HD 7570", 
                             300, "HDD", 8, "2x4", "1333", "DDR3", "Windows 10", "temp.png");
const hpcompa2 = new product("HP40", 80, "HP", "Compaq 4000", "SFF", "Intel Pentium E6700 3.20GHz", "AMD Radeon HD 7570", 
                             300, "HDD", 8, "2x4", "1333", "DDR3", "Windows 10", "temp.png");
let randProducts = [];
randProducts[0] = allproducts[Math.floor(Math.random()*allproducts.length)];
randProducts[1] = allproducts[Math.floor(Math.random()*allproducts.length)];
for(var i=0;i<1;){
    if(randProducts[0]==randProducts[1]){
        randProducts[1] = allproducts[Math.floor(Math.random()*allproducts.length)];
    }else{
        i++;
    }
}
randProducts[2] = allproducts[Math.floor(Math.random()*allproducts.length)];
for(var i=0;i<1;){
    if(randProducts[0]==randProducts[2]||randProducts[1]==randProducts[2]){
        randProducts[2] = allproducts[Math.floor(Math.random()*allproducts.length)];
    }else{
        i++;
    }
}
for(var i=1;i<4;i++){
    //so... I totally COULD change it so that only the getElements were -1 of the index...
    //ooooor i could not do that
    document.getElementById("product"+i+"img").src = "imgs/products/"+randProducts[i-1].img;
    document.getElementById("product"+i+"desc").innerHTML = "<pt>"+randProducts[i-1].name+
        "</pt><br>CPU: "+randProducts[i-1].cpu+"<br>GPU: "+randProducts[i-1].gpu+
        "<br>RAM: "+randProducts[i-1].ramx+"GB "+randProducts[i-1].ramtype+" "+randProducts[i-1].ramspeed+
        "MHz<br>Storage: "+randProducts[i-1].storage+"GB "+randProducts[i-1].storagetype+"<br>Operating System: "+
        randProducts[i-1].os+"<br><a href='TODO: INSERT LINK'>Buy for $"+randProducts[i-1].price+"</a>";

}
//make it so all text shows default cursor instead of text selector
document.body.style.cursor = "default";
//make buttons show cursor as pointer
document.getElementById("button1").style.cursor = "pointer";
document.getElementById("button2").style.cursor = "pointer";
document.getElementById("button3").style.cursor = "pointer";
document.getElementById("button4").style.cursor = "pointer";
document.getElementById("darkbutton").style.cursor = "pointer";
//dark mode detector
if (window.matchMedia) {const query = window.matchMedia('prefers-color-scheme: dark');}
let isDarkMode = () =>window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if(isDarkMode){
    isDarkMode=1;
}else{
    isDarkMode=0;
    //if the user's theme is set to light (the psychopath!) the dark marks are toggled, otherwise they're backwards.
    document.querySelector("#badidea1").classList.toggle("badideadark");
    document.querySelector("#badidea2").classList.toggle("badideadark");
    document.querySelector("#badidea3").classList.toggle("badideadark");
}
darkmodetoggle();
//Toggles darkmode
function darkmodetoggle(){
    if(isDarkMode){
        //swap the light & dark header images
        document.getElementById("headerimgdark").style.opacity = 100;
        document.getElementById("headerimglight").style.opacity = 0;
        document.getElementById("header").style.backgroundColor = "#242424";
        //     document.getElementById("edgeL").style.backgroundColor = "#242424";
        //   document.getElementById("edgeR").style.backgroundColor = "#242424";
        document.getElementById("bibase").style.backgroundColor = "#242424";
        document.getElementById("darkbutton").src="imgs/dark/dark.png"
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.color = "#B8B8B8";
        }
    }else{
        //swap the light & dark header images
        document.getElementById("headerimgdark").style.opacity = 0;  //  oh good
        document.getElementById("headerimglight").style.opacity = 100;//more bull
        document.getElementById("header").style.backgroundColor = "white";
        //   document.getElementById("edgeL").style.backgroundColor = "white";
        // document.getElementById("edgeR").style.backgroundColor = "white";
        document.getElementById("bibase").style.backgroundColor = "white";
        document.getElementById("darkbutton").src="imgs/light/light.png"
        //easier to just make the buttons change in a for loop
        for(var i=1;i<5;i++){
            document.getElementById("button"+i).style.color = "black";
        }
    }//this is all crap
    //toggle the dark mode on elements with mark (highlight)
    document.querySelector("#badidea1").classList.toggle("badideadark");
    document.querySelector("#badidea2").classList.toggle("badideadark");
    document.querySelector("#badidea3").classList.toggle("badideadark");
}
//detect mouse move events
addEventListener("mousemove", (event) => {});
//what happens when mouse moves
onmousemove = (event) => {};
//something something called by html button
//no, it doesn't work in the other function and i have NO IDEA WHY NOT
makeitdark();
function makeitdark(){
    isDarkMode = !isDarkMode;
    //  darkmodetoggle();
    document.getElementById("darkbutton").style.display = "none";
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
