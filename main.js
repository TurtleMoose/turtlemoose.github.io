document.getElementById("darkbutton").style.height = document.getElementById("darkbutton").offsetWidth+"px";
    //dark mode changes
    if (window.matchMedia) {const query = window.matchMedia('prefers-color-scheme: dark');}
    let isDarkMode = () =>window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if(isDarkMode){isDarkMode=1;}else{isDarkMode=0;}
    darkcheck();
    function darkcheck(){
        if(isDarkMode){
            document.getElementById("header").style.backgroundColor = "#242424";
            document.getElementById("headerimg").src = "imgs/FranklinITnosloganDark.png";
            document.getElementById("edgeL").style.backgroundColor = "#242424";
            document.getElementById("edgeR").style.backgroundColor = "#242424";
            document.getElementById("darkbutton").src="imgs/dark.png"
        }else{
            document.getElementById("header").style.backgroundColor = "white";
            document.getElementById("headerimg").src = "imgs/FranklinITnoslogan.png";
            document.getElementById("edgeL").style.backgroundColor = "white";
            document.getElementById("edgeR").style.backgroundColor = "white";
            document.getElementById("darkbutton").src="imgs/light.png"
        }
    }
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
    document.getElementById("button1").style.paddingTop = "15px";
    document.getElementById("header").style.height = "95px";
    document.getElementById("buttonbox").style.top = "0px";
    document.getElementById("headerimg").style.height="95px"
    for(var i=1;i<5;i++){
        document.getElementById("button"+i).style.height = "50px";
        document.getElementById("button"+i).style.paddingTop = "15px";
        document.getElementById("button"+i).style.top = "10px";
        document.getElementById("button"+i).style.borderRadius = "25px";
    }
    //I think if it scrolls, it calls that function.
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
            //if scrolled down past 37px
            document.getElementById("header").style.fontSize = "100%";
            document.getElementById("header").style.height = "50px";
            document.getElementById("buttonbox").style.top = "-9px";//no i don't know freaking why
            document.getElementById("headerimg").style.height="50px"
            //is it even worth making a loop here
            for(var i=1;i<5;i++){
                document.getElementById("button"+i).style.height = "36px";
                document.getElementById("button"+i).style.paddingTop = "0px";
                document.getElementById("button"+i).style.top = "11px";
                document.getElementById("button"+i).style.borderRadius = "20px";
            }//i guess so
        }else{//oh lord help me this is going on an live site soon
            //if not scrolled down
            document.getElementById("header").style.fontSize = "100%";
            document.getElementById("button1").style.paddingTop = "15px";
            document.getElementById("header").style.height = "95px";
            document.getElementById("buttonbox").style.top = "0px";
            document.getElementById("headerimg").style.height="95px"
            for(var i=1;i<5;i++){
                document.getElementById("button"+i).style.height = "50px";
                document.getElementById("button"+i).style.paddingTop = "15px";
                document.getElementById("button"+i).style.top = "10px";
                document.getElementById("button"+i).style.borderRadius = "25px";
            }
        }
    }//christ thats ugly but it works