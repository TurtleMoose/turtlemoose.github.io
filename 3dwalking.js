//EXAMPLE




//thank you to /u/ivanhoe90 on reddit for initial 3d demo, 
//thats probably where any useful comments came from

//default rendering
let strokeit = false;//questionable variable name
let fillit = true;
//default player fov: the height of the screen is about what you want it to be
let fov = window.innerHeight;
//default player movement speed (per frame)
let playerSpeedFinal = 0.1;
//helps with sprint or crouch, changing speed, etc
let playerSpeedCurrent = 0.1;
//used for gliding stops/starts
let glideSpeedMod = 0.007;
let sprintMod = 2;
let camRotSpeed = 0.05;
//background color
let backgroundColor = "#FFFFFF";
//Where should the player spawn (default is triple 0)
let playerXspawn = 0, playerYspawn = 0, playerZspawn = 0;
//unfinished/experimental up/down camera rotation
let keysormouse = 0;
//pi goofy things
let pi = Math.PI;
let t = pi*2;
let siT=0,fiT=0;
let maxframerate=60;
let fa = new Array(11).fill(1);
let stickattack = [true, 0, false, 6, 6];
let paused = true;
let numTrisVisible = 0;
function mousePos(event) {
    Mouse.x = event.clientX;
    Mouse.y = event.clientY;
}
// ___________________________________________________________________________________
//|              THE FUNCTIONS LISTED ABOVE ARE BELOW THIS                            |
//|                stuff to use in another doc                                        |
//|___________________________________________________________________________________|
//It is NOT necessary to run this function. There ARE default values, this is for changing it from another file.
function initialize(px,py,pz,pa,ps,sm,cs,pf,b,mr,s,f,kom){
    setCamPos(px,py,pz);
    playerXspawn = px;
    playerYspawn = py;
    playerZspawn = pz;
    setCamAngle(pa);
    camRotSpeed = cs;
    playerSpeedFinal = ps;
    sprintMod = sm;
    fov = pf;
    backgroundColor = b;
    maxframerate=mr
    strokeit = s;
    fillit = f;
    keysormouse = kom;
}
function changeCamPos(x,y,z){
    //move the camera by a specific distance
    let xchange = x-playerX, zchange = z-playerZ;
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=xchange;
        }
        for(var j=1;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=ychange;
        }
        for(var j=2;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=zchange;
        }
        boxes[i].z+=zchange;
        boxes[i].x+=xchange;
        boxes[i].y+=ychange;
    }
    playerX += x;
    playerY += y;
    playerZ += z;
}
function setCamPos(x,y,z){
    //set camera position
    let xchange = x-playerX, ychange = y-playerY, zchange = z-playerZ;
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=xchange;
        }
        for(var j=2;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=zchange;
        }
        //tk
        boxes[i].x+=xchange;
        boxes[i].z+=zchange;
        playerY+=ychange;


        //  boxes[i].y+=ychange;
    }
    for(var i=0;i<boxes.length;i++){
        for(var j=1;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=ychange;
        }
        boxes[i].y+=ychange;
    }
    // for(var i=0;i<withplayer.length;i++){
    //     for(var j=0;j<boxes[i].pnts.length;j+=3){
    //         withplayer[i].pnts[j]-=xchange;
    //     }
    //     for(var j=2;j<boxes[i].pnts.length;j+=3){
    //         withplayer[i].pnts[j]-=zchange;
    //     }
    // }
    // for(var i=0;i<withplayer.length;i++){
    //     for(var j=0;j<boxes[i].pnts.length;j+=3){
    //         wplaynorot[i].pnts[j]+=xchange;
    //     }
    //     for(var j=2;j<boxes[i].pnts.length;j+=3){
    //         wplaynorot[i].pnts[j]+=zchange;
    //     }
    // }
    //so this made this function work and i just stumbled on it
    //my best guess is that i forgot how my code worked and that this makes it work
    playerX = x;
    //there's no way this will stay working ha ha
    playerY = y;
    playerZ = z;
    //red rover red rover send a pint over
}
function setCamAngle(a){
    t = a*(pi/180);
}
function changeCamAngle(a){
    t += a*(pi/180);
}
function changeBackgroundColor(c){
    backgroundColor = c;
}
function setFOV(f){
    fov = f;
}
//All boxes made go to here
let boxes = [];
//all boxes made with corporeal set to true go to here as well.
let contact = [];
let withplayer = [];
let wplaynorot = [];
class box {
    constructor(centerx, centery, centerz, width, height, depth, rotXY, rotYZ, rotXZ, color, corporeal, withtheplayer){
        this.x = centerx*-1; this.y = centery*-1; this.z = centerz*-1;  this.ismodel = false;
        this.w = width; this.h = height; this.d = depth; this.c = color;
        this.pnts = [this.x-(this.w/2),this.y-(this.h/2),this.z-(this.d/2),this.x+(this.w/2),this.y-(this.h/2),this.z-(this.d/2),
                     this.x+(this.w/2),this.y-(this.h/2),this.z+(this.d/2),this.x-(this.w/2),this.y-(this.h/2),this.z+(this.d/2),
                     this.x-(this.w/2),this.y+(this.h/2),this.z-(this.d/2),this.x+(this.w/2),this.y+(this.h/2),this.z-(this.d/2),
                     this.x+(this.w/2),this.y+(this.h/2),this.z+(this.d/2),this.x-(this.w/2),this.y+(this.h/2),this.z+(this.d/2)];
        this.tgls = [0,1,2,  2,3,0,  4,5,6,  6,7,4,  0,1,4,  1,4,5,  1,2,5,  2,5,6,  2,3,6,  3,6,7,  3,0,7,  0,7,4];
        this.rXY = rotXY; this.rYZ = rotYZ; this.rXZ = rotXZ; this.rotateXY = rotXY; this.rotateYZ = rotYZ; this.rotateXZ = rotXZ;

        //TODO: fix this by making them attributes/tags/variables/whatever instead of multiple lists
        if(corporeal){contact.push(this);} if(withtheplayer==0){boxes.push(this);}else if(withtheplayer==1){withplayer.push(this);boxes.push(this);}else if(withtheplayer==2){wplaynorot.push(this);this.x=0;this.y=0;this.z=0;}else if(withtheplayer==3){withplayer.push(this);wplaynorot.push(this);this.x=0;this.y=0;this.z=0;}
    }
    get points(){return this.pnts;}
    get triangles(){return this.tgls;}
    get color(){
        return this.c;
    }
    get moddedtgls(){
        let moddedtgs = [];
        if(playerY>(this.y+(this.h/2))*-1){
            //top face
            moddedtgs.push(0,1,2, 2,3,0);
        }else if(playerY<(this.y-(this.h/2))*-1){
            //bottom face
            moddedtgs.push(4,5,6, 6,7,4);
        }
        if(0>(this.x-(this.w/2))*-1){
            //side face
            moddedtgs.push(3,0,7, 0,7,4);
        }else if(0<(this.x+(this.w/2))*-1){
            //also side face
            moddedtgs.push(1,2,5, 2,5,6);
        }
        if(0>(this.z-(this.d/2))*-1){
            //back? face
            moddedtgs.push(0,1,4, 1,4,5);
        }else if(0<(this.z+(this.d/2))*-1){
            //front? face
            moddedtgs.push(2,3,6, 3,6,7);
        }
        //TODO: make it so that a perpendicular vector decides if each triangle is visible or not.
        return this.tgls//moddedtgs;
    }
    get distance(){
        this.dista = Math.sqrt((((this.x*-1))*((this.x*-1)))+
                               (((this.y*-1))*((this.y*-1)))+
                               (((this.z*-1))*((this.z*-1))));
        return this.dista;
    }
    set rotateXY(setrot){
        this.rXY = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+0]-this.x;
            let zdist = this.pnts[i+1]-this.y;
            this.pnts[i+0] = ((Math.cos(this.rXY)*xdist)-(Math.sin(this.rXY)*zdist))+this.x;
            this.pnts[i+1] = ((Math.cos(this.rXY)*zdist)+(Math.sin(this.rXY)*xdist))+this.y;
            //    document.getElementById("fps").innerHTML += xdist+" "+zdist+" "+this.pnts[i]+" "+this.pnts[i+2]+"<br>"
        }
    }
    set rotateXZ(setrot){
        this.rXZ = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+0]-this.x;
            let zdist = this.pnts[i+2]-this.z;
            this.pnts[i+0] = ((Math.cos(this.rXZ)*xdist)-(Math.sin(this.rXZ)*zdist))+this.x;
            this.pnts[i+2] = ((Math.cos(this.rXZ)*zdist)+(Math.sin(this.rXZ)*xdist))+this.z;
            //  document.getElementById("tes").innerHTML += this.pnts
        }
    }
    set rotateYZ(setrot){
        this.rYZ = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+2]-this.z;
            let zdist = this.pnts[i+1]-this.y;
            this.pnts[i+2] = ((Math.cos(this.rYZ)*xdist)-(Math.sin(this.rYZ)*zdist))+this.z;
            this.pnts[i+1] = ((Math.cos(this.rYZ)*zdist)+(Math.sin(this.rYZ)*xdist))+this.y;
            //    document.getElementById("fps").innerHTML += xdist+" "+zdist+" "+this.pnts[i]+" "+this.pnts[i+2]+"<br>"
        }
    }
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get getZ(){
        return this.z;
    }
}
class model {
    constructor(x, y, z, triangles, points, color, withtheplayer){
        this.x = x*-1; this.y = y*-1; this.z = z*-1; this.ismodel = true;
        this.tgls = triangles; this.pnts = []; this.c = color;
        for(var i=0;i<points.length;i+=3){
            this.pnts[i+0] = (-1*points[i+0])-x;
            this.pnts[i+1] = (-1*points[i+1])-y;
            this.pnts[i+2] = (-1*points[i+2])-z;
        }
        if(withtheplayer==0){boxes.push(this);}else if(withtheplayer==1){withplayer.push(this);boxes.push(this);}else if(withtheplayer==2){wplaynorot.push(this);this.x=0;this.y=0;this.z=0;}else if(withtheplayer==3){withplayer.push(this);wplaynorot.push(this);this.x=0;this.y=0;this.z=0;}
    }
    get points(){return this.pnts;}
    get triangles(){return this.tgls;}
    get color(){
        return this.c;
    }
    get moddedtgls(){
        return this.tgls;
    }
    get distance(){
        this.dista = Math.sqrt((((this.x*-1))*((this.x*-1)))+
                               (((this.y*-1))*((this.y*-1)))+
                               (((this.z*-1))*((this.z*-1))));
        return this.dista;
    }
    set rotateXY(setrot){
        this.rXY = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+0]-this.x;
            let zdist = this.pnts[i+1]-this.y;
            this.pnts[i+0] = ((Math.cos(this.rXY)*xdist)-(Math.sin(this.rXY)*zdist))+this.x;
            this.pnts[i+1] = ((Math.cos(this.rXY)*zdist)+(Math.sin(this.rXY)*xdist))+this.y;
            //    document.getElementById("fps").innerHTML += xdist+" "+zdist+" "+this.pnts[i]+" "+this.pnts[i+2]+"<br>"
        }
    }
    set rotateXZ(setrot){
        this.rXZ = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+0]-this.x;
            let zdist = this.pnts[i+2]-this.z;
            this.pnts[i+0] = ((Math.cos(this.rXZ)*xdist)-(Math.sin(this.rXZ)*zdist))+this.x;
            this.pnts[i+2] = ((Math.cos(this.rXZ)*zdist)+(Math.sin(this.rXZ)*xdist))+this.z;
            //  document.getElementById("tes").innerHTML += this.pnts
        }
    }
    set rotateYZ(setrot){
        this.rYZ = setrot*(pi/180);
        for(var i=0;i<this.pnts.length;i+=3){
            let xdist = this.pnts[i+2]-this.z;
            let zdist = this.pnts[i+1]-this.y;
            this.pnts[i+2] = ((Math.cos(this.rYZ)*xdist)-(Math.sin(this.rYZ)*zdist))+this.z;
            this.pnts[i+1] = ((Math.cos(this.rYZ)*zdist)+(Math.sin(this.rYZ)*xdist))+this.y;
            //    document.getElementById("fps").innerHTML += xdist+" "+zdist+" "+this.pnts[i]+" "+this.pnts[i+2]+"<br>"
        }
    }
    get getX(){
        return this.x;
    }
    get getY(){
        return this.y;
    }
    get getZ(){
        return this.z;
    }
}

function loadModelFile(path, x, y, z, color, rx, ry, rz){
    fetch(path)
        .then(response => {
            if (!response.ok) {
                test(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            test(data);
        })
        .catch(error => {
            test('Fetch error:'+error);
        });
}
//some things
let forward, back, left, right;
//this might be confusing seeing above, but this is initializing the
//player coordinates. The coordinates are later set to the spawn area
//with the setCamPos function. basically it's just BS coming together.
let playerX = 0, playerY = 0, playerZ = 0;
let rotUp = false, rotDown = false;
let vertAngle = 0;
var cnv = document.getElementById("cnv"), ctx = cnv.getContext("2d");
cnv.width = window.innerWidth;  cnv.height = window.innerHeight;
let lasttimeupdate = Date.now();
let timedifference;

let mousemoveX=0, mousemoveY=0;
function mousemovement(e) {
    mousemoveX = e.movementX; 
    mousemoveY = e.movementY;
}
document.addEventListener("mousemove", mousemovement);
//this is here when the game would start to set the inital points
setCamPos(playerXspawn, playerYspawn, playerZspawn);
update();
//function to make a mass of smaller boxes, for whatever reason
function massBox(firstx, firsty, firstz, xdim, ydim, zdim, xval, yval, zval, rotaXY, rotaYZ, rotaXZ, bcolor, corp, sep){
    let xangle = 1; let yangle = 1; let zangle = 1;
    if(rotaXZ!=0){xangle = Math.cos(rotaXZ*(pi/180));}
    if(rotaYZ!=0){yangle = Math.sin(rotaYZ*(pi/180));}
    if(rotaXY!=0){zangle = Math.sin(rotaXY*(pi/180));}
    for(var x=0;x<xval;x++){
        for(var y=0;y<yval;y++){
            for(var z=0;z<zval;z++){
                new box(firstx+(xdim*x*xangle),firsty+(ydim*y*yangle),firstz+(zdim*z*zangle),xdim,ydim,zdim,rotaXY,rotaYZ,rotaXZ,bcolor,corp,sep);
            }
        }
    }
}
//alternating colors that I used for a specific thing.
function massBox2c(firstx, firsty, firstz, xdim, ydim, zdim, xval, yval, zval, rotaXY, rotaYZ, rotaXZ, bcolor, colorlen, corp, sep){
    let xangle = 1; let yangle = 1; let zangle = 1;
    let i = 0; 
    if(rotaXZ!=0){xangle = Math.cos(rotaXZ*(pi/180));}
    if(rotaYZ!=0){yangle = Math.sin(rotaYZ*(pi/180));}
    if(rotaXY!=0){zangle = Math.sin(rotaXY*(pi/180));}
    for(var x=0;x<xval;x++){
        for(var y=0;y<yval;y++){
            for(var z=0;z<zval;z++){
                new box(firstx+(xdim*x*xangle),firsty+(ydim*y*yangle),firstz+(zdim*z*zangle),xdim,ydim,zdim,rotaXY,rotaYZ,rotaXZ,bcolor[i%colorlen],corp,sep);
                i++;
            }
        }
    }
}
let zcount = 0;
function update() {
    //test(Mouse.x+" "+Mouse.y)
    document.getElementById("p").style.opacity=0;
    cnv.width = window.innerWidth;  cnv.height = window.innerHeight;
    if(keysormouse==0){
        if(Key.isDown(Key.rotateLeft)){t-=camRotSpeed;}
        if(Key.isDown(Key.rotateRight)){t+=camRotSpeed;}
        if(Key.isDown(Key.rotateUp)){vertAngle+=camRotSpeed;}
        if(Key.isDown(Key.rotateDown)){vertAngle-=camRotSpeed;}
    }else{
        t+=mousemoveX/200;
        vertAngle-=mousemoveY/200;
        //reset it
        mousemoveX = 0;
        mousemoveY = 0;
    }
    //TODO: VERY IMPORTANT FIX THE WITHPLAYER STUFF IT'S TERRIBLE
    //TODO: this would have to be replaced with something for jumping. 
    if(Key.isDown(Key.r)){playerY+=playerSpeedCurrent;
                          // for(var i=0;i<withplayer.length;i++){
                          //     for(var j=1;j<boxes[i].pnts.length;j+=3){
                          //         withplayer[i].pnts[j]-=playerSpeedCurrent;
                          //     }
                          //     withplayer[i].y-=playerSpeedCurrent;
                          // }
                          for(var i=0;i<boxes.length;i++){
                              for(var j=1;j<boxes[i].pnts.length;j+=3){
                                  boxes[i].pnts[j]+=playerSpeedCurrent;
                              }
                              boxes[i].y+=playerSpeedCurrent;
                          }
                         }
    if(Key.isDown(Key.f)){playerY-=playerSpeedCurrent;
                          // for(var i=0;i<withplayer.length;i++){
                          //     for(var j=1;j<boxes[i].pnts.length;j+=3){
                          //         withplayer[i].pnts[j]+=playerSpeedCurrent;
                          //     }
                          //     withplayer[i].y+=playerSpeedCurrent;
                          // }
                          for(var i=0;i<boxes.length;i++){
                              for(var j=1;j<boxes[i].pnts.length;j+=3){
                                  boxes[i].pnts[j]-=playerSpeedCurrent;
                              }
                              boxes[i].y-=playerSpeedCurrent;
                          }
                         }

    if(Key.isDown(Key.sprint)){playerSpeedCurrent = playerSpeedFinal*sprintMod}else{playerSpeedCurrent = playerSpeedFinal}
    //TODO: Add crouch
    if(Key.isDown(Key.crouch)){}

    if(Key.isDown(Key.fovUp)){fov+=10;}
    if(Key.isDown(Key.fovDown)){fov-=10;}
    if(Key.isDown(Key.forward)){forward=true;}else{forward=false;}
    if(Key.isDown(Key.backward)){back=true;}else{back=false;}
    if(Key.isDown(Key.left)){left=true;}else{left=false;}
    if(Key.isDown(Key.right)){right=true;}else{right=false;}

    if(Key.isDown(Key.one)){jitter(0.5)}
    if(Key.isDown(Key.two)){shatter();}
    if(Key.isDown(Key.u)){for(var i=0;i<boxes.length;i++){boxes[i].rotateXY = 11;}}
    if(Key.isDown(Key.i)){for(var i=0;i<boxes.length;i++){boxes[i].rotateXY = -11;}}
    if(Key.isDown(Key.j)){for(var i=0;i<boxes.length;i++){boxes[i].rotateXZ = 11;}}
    if(Key.isDown(Key.k)){for(var i=0;i<boxes.length;i++){boxes[i].rotateXZ = -11;}}
    if(Key.isDown(Key.n)){for(var i=0;i<boxes.length;i++){boxes[i].rotateYZ = 11;}}
    if(Key.isDown(Key.m)){for(var i=0;i<boxes.length;i++){boxes[i].rotateYZ = -11;}}

    if((Key.isDown(Key.leftBracket)||Key.isDown(Key.leftSquare))&&!siT){strokeit=!strokeit;siT=true;}
    if((Key.isDown(Key.rightBracket)||Key.isDown(Key.rightSquare))&&!fiT){fillit=!fillit;fiT=true;}
    if(!(Key.isDown(Key.leftBracket)||Key.isDown(Key.leftSquare))&&siT){siT=false;}
    if(!(Key.isDown(Key.rightBracket)||Key.isDown(Key.rightSquare))&&fiT){fiT=false;}

    let move = movementXZ(left,right,forward,back,(t*(180/pi)),playerSpeedCurrent);
    //TODO: add collision (coming back and looking at this... no. not yet. no way josue.)
    playerX += move[0]; playerZ += move[1];
    console.log(Key.pressed);
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=move[0];
        }
        for(var j=2;j<boxes[i].pnts.length;j+=3){
            boxes[i].pnts[j]+=move[1];
        }
        //tk
        boxes[i].x+=move[0];
        boxes[i].z+=move[1];
    }
    for(var i=0;i<withplayer.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            withplayer[i].pnts[j]-=move[0];
        }
        for(var j=2;j<boxes[i].pnts.length;j+=3){
            withplayer[i].pnts[j]-=move[1];
        }
        withplayer[i].x-=move[0];
        withplayer[i].z-=move[1];
    }
    for(var i=0;i<wplaynorot.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            wplaynorot[i].pnts[j]+=move[0];
        }
        for(var j=2;j<boxes[i].pnts.length;j+=3){
            wplaynorot[i].pnts[j]+=move[1];
        }
        wplaynorot[i].x = 0;
        wplaynorot[i].y = 0.4
        wplaynorot[i].z = 0;
    }
    //weapon I guess? for now it's just the stick
    //TODO: make this able to be whatever model
    // note: likely with some kind of tag/attribute thing 
    if(stickattack[0]){
        if(Mouse.left){
            stickattack[0] = false;
            stickattack[1] = 1;
            stickattack[2] = false;
        }
    }else if(stickattack[1]!=0){
        if(stickattack[1]<stickattack[4]&&!stickattack[2]){
            stick.rotateYZ = stickattack[3];
            stickattack[1]++;
        }else if(stickattack[1]>0&&stickattack[2]){
            stick.rotateYZ = -stickattack[3];
            stickattack[1]--;
        }else{
            stickattack[1]--;
            stickattack[2] = true;
        }
    }
    if(!stickattack[0]&&stickattack[1]==0){
        stickattack[0] = true;
    }
    //camera angle matrix (I'd like to thank wikipedia, chatgpt, and the power of BS for this one)
    var mat = [t, vertAngle, 0];
    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight)
    // let imageData = ctx.getImageData(0,0,window.innerWidth,window.innerHeight);
    //ordered clones boxes
    let ordered = [];
    for(var i=0;i<boxes.length;i++){
        ordered.push(boxes[i].distance);
    }
    //boxesdist is a clone of ordered at this point
    let boxesdist = [];
    for(var i=0;i<ordered.length;i++){
        boxesdist.push(ordered[i]);
    }
    //ordered sorts numerically
    ordered.sort(function(a, b) {
        return a - b;
    });
    //WELL THAT TOOK LONG ENOUGH
    //THIS MAKES THE Z-INDEXING WORK I HAVE NO IDEA HOW WHAT THE HECK
    ordered.reverse();
    //UPDATE: I don't know what my code is doing anymore
    //now boxesdist is still in the order of boxes
    //but ordered is sorted by distance
    //sort things
    let ordboxes = [];
    for(var i=0;i<ordered.length;i++){
        for(var j=0;j<ordered.length;j++){
            if(ordered[i]==boxesdist[j]&&!ordboxes.includes(j)){//double value protection
                ordboxes.push(j);
                break;
            }
        }
    }
    let moddedboxes = [];
    //sets the moddedboxes list to boxes but in the order of ordboxes
    for(var i=0;i<ordered.length;i++){
        moddedboxes.push(boxes[ordboxes[i]]);
    }
    numTrisVisible = 0;
    //draws the boxes, the further in the list the closer to the camera it has to be
    // document.getElementById("tes").textContent = box0.getZ
    for(var i=0;i<ordered.length;i++){
        draw(moddedboxes[i].points, moddedboxes[i].moddedtgls, mat, moddedboxes[i].color, moddedboxes[i]);
    }
    //stick drawing, keeps stick from clipping
    for(var i=0;i<wplaynorot.length;i++){
        var sweapon=Math.sin(0), cweapon=Math.cos(0);
        draw(wplaynorot[i].points, wplaynorot[i].tgls, [0,0,0], wplaynorot[i].color, wplaynorot[i]);
    }
    //set coo text to coordinates
    document.getElementById("coo").innerHTML = boxes[0].y+"X: "+Math.floor(playerX*100)/100+" Y: "+Math.floor(playerY*100)/100+" Z: "+Math.floor(playerZ*100)/100+"<br>Yaw: "+t*(180/pi)+" Pitch: "+vertAngle*(180/pi)+"<br>FOV: "+fov;
    // ctx.drawImage(cnv, 0.5, 0.5);
    if(!document.hasFocus()/*||document.pointerLockElement==null*/){paused = true;}
    if(!paused){
        window.requestAnimationFrame(update);
    }else{
        pause();
    }
    frames();
}
let pausedelay = false;
function pause(){
    document.getElementById("p").style.opacity=1;
    frames();
    if(Key.isUp(Key.escape)){pausedelay = true;}
    if(Key.isDown(Key.backtick)&&pausedelay){
        paused = false;
        pausedelay = false;
        //togglePointerLock();
        test("anything");
        window.requestAnimationFrame(update());
    }else{
        window.requestAnimationFrame(pause());
    }
}
function frames(){
    //Frame counter, i think its something with delta time?
    timedifference = (Date.now() - lasttimeupdate);
    while(timedifference<(1000/maxframerate)){timedifference = (Date.now() - lasttimeupdate);}
    lasttimeupdate = Date.now();
    //console.log(temptime);
    var framerate = Math.floor(1000/(timedifference));
    //this averages it out over the last ten frames for a more readable
    //output (no flashing when at refresh rate)
    fa[(fa[0]%10)+1] = framerate;
    fa[0]++;
    let average = (fa[1]+fa[2]+fa[3]+fa[4]+fa[5]+fa[6]+fa[7]+fa[8]+fa[9]+fa[10])/10;
    document.getElementById("fps").textContent = "FPS: "+average+" / Max: "+maxframerate+" / Triangles: "+numTrisVisible;
}
function draw(ps, ts, m, C, box) {
    for(var i=0; i<ts.length; i+=3) {
        var p0 = ts[i]*3, p1 = ts[i+1]*3, p2=ts[i+2]*3;
        var a = vertexShader(ps[p0], ps[p0+1], ps[p0+2], m);
        var b = vertexShader(ps[p1], ps[p1+1], ps[p1+2], m);
        var c = vertexShader(ps[p2], ps[p2+1], ps[p2+2], m);
        fragmentShader(a,b,c, C, box, m);
    }
}
function vertexShader(x,y,z, m) {
    //Yaw Pitch Roll
    const cosY = Math.cos(m[0]), sinY = Math.sin(m[0]);
    const cosP = Math.cos(m[1]), sinP = Math.sin(m[1]);
    const cosR = Math.cos(m[2]), sinR = Math.sin(m[2]);

    const rot = [
        [cosY*cosR+sinY*sinP*sinR, sinR*cosP, -sinY*cosR+cosY*sinP*sinR],
        [-cosY*sinR+sinY*sinP*cosR, cosR*cosP, sinR*sinY+cosY*sinP*cosR],
        [sinY*cosP, -sinP, cosY*cosP]
    ];

    return [
        rot[0][0] * x + rot[0][1] * y + rot[0][2] * z,
        rot[1][0] * x + rot[1][1] * y + rot[1][2] * z,
        rot[2][0] * x + rot[2][1] * y + rot[2][2] * z
    ];
}
// you can make a Z-buffer, sampling from texture, phong shading... 
//...not that i know how to do that. i don't even know what phong shading is. (ok i looked it up its just fancy shading) 
function fragmentShader(a,b,c, C, box) { 
    var mz=Math.min(a[2],b[2],c[2]);  if(mz<0.01) { return; }
    var sna = fov;//fov
    var rec = (window.innerWidth/2);//where camera is x axis
    var kne = (window.innerHeight/2);
    var x0=rec+sna*a[0]/a[2], y0=kne+sna*a[1]/a[2];  
    var x1=rec+sna*b[0]/b[2], y1=kne+sna*b[1]/b[2]; 
    var x2=rec+sna*c[0]/c[2], y2=kne+sna*c[1]/c[2];
    if((x0<0&&x1<0&&x2<0)||(x0>window.innerWidth&&x1>window.innerWidth&&x2>window.innerWidth)){
        return;
    }
    if((y0<0&&y1<0&&y2<0)||(y0>window.innerHeight&&y1>window.innerHeight&&y2>window.innerHeight)){
        return;
    }
    numTrisVisible++;
    // we should loop through all pixels of a 2D triangle ...
    // but we just stroke its outline
    ctx.beginPath();
    ctx.moveTo(x0,y0);  ctx.lineTo(x1,y1);  ctx.lineTo(x2,y2);  ctx.lineTo(x0,y0);

    if(strokeit){
        ctx.strokeStyle = "#000000"
        ctx.stroke();
    }else if(C.substring(0,4)=="rgba"&&C.substring(C.lastIndexOf(",")+1,C.indexOf(")"))!="1" ){
        //TODO: fix transparency
        ctx.strokeStyle = C.substring(0,C.length-3)+"0.005)";
        ctx.stroke();
    }else{
        ctx.strokeStyle = C;
        ctx.stroke();
    }
    //ctx.stroke();
    if(fillit){
        ctx.fillStyle = C;
    }
    //at mouse position
    if(ctx.isPointInPath(Mouse.x,Mouse.y)&&Mouse.left){
        test(box.color);
    }
    //center of screen
    // if(ctx.isPointInPath(window.innerWidth/2,window.innerHeight/2)){
    //     test(box.color);
    // }
    // test(Mouse.x+" "+Mouse.y)
    if(fillit){
        ctx.fill();
    }
    ctx.closePath();
}
function shatter(){
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            let thedist = Math.sqrt((((boxes[i].pnts[j+0]*-1) - playerX)*((boxes[i].pnts[j+0]*-1) - playerX))+
                                    (((boxes[i].pnts[j+1]*-1) - playerY)*((boxes[i].pnts[j+1]*-1) - playerY))+
                                    (((boxes[i].pnts[j+2]*-1) - playerZ)*((boxes[i].pnts[j+2]*-1) - playerZ)));
            let mz = Math.sin((t*(180/pi))*(pi/180))*thedist;
            let mx = Math.cos((t*(180/pi))*(pi/180))*thedist;
            let xzdis = Math.sqrt((mx*mx)+(mz*mz));
            vertAngle += camRotSpeed;
            let xmove = 0;
            let ymove = Math.sin((vertAngle*(180/pi))*(pi/180))*xzdis;
            let zmove = Math.cos((vertAngle*(180/pi))*(pi/180))*xzdis;
            boxes[i].pnts[j+0]+=xmove;//e q u a l   s p a c e s
            boxes[i].pnts[j+1]+=ymove;
            boxes[i].pnts[j+2]-=zmove;
        }
    }
}//TODO: figure out if these are needed and remove if not
function jitter(dist){
    for(var i=0;i<boxes.length;i++){
        for(var j=0;j<boxes[i].pnts.length;j+=3){
            let thedist = Math.sqrt((((boxes[i].pnts[j+0]*-1) - playerX)*((boxes[i].pnts[j+0]*-1) - playerX))+
                                    (((boxes[i].pnts[j+1]*-1) - playerY)*((boxes[i].pnts[j+1]*-1) - playerY))+
                                    (((boxes[i].pnts[j+2]*-1) - playerZ)*((boxes[i].pnts[j+2]*-1) - playerZ)));
            let mz = Math.sin((t*(180/pi))*(pi/180))*camRotSpeed*dist;
            let mx = Math.cos((t*(180/pi))*(pi/180))*camRotSpeed*dist;
            let xzdis = Math.sqrt((mx*mx)+(mz*mz));
            vertAngle += camRotSpeed*180/pi;
            let xmove = 0;
            let ymove = Math.sin((vertAngle*(180/pi))*(pi/180))*xzdis;
            let zmove = Math.cos((vertAngle*(180/pi))*(pi/180))*xzdis;
            boxes[i].pnts[j+0]+=xmove;//e q u a l   s p a c e s
            boxes[i].pnts[j+1]+=ymove;
            boxes[i].pnts[j+2]-=zmove;
        }
    }
}
function movementXZ(l,r,u,d,angle,speed){
    returnlist = [0,0];
    if(!l&&!r&&!u&&!d){return [0,0];}
    //if((l&&r&&!u&&!d)||(u&&d&&!l&&!r)){return [0,0];}
    //invert angle
    angle=(angle+180+(180-2*angle))%360;
    //THE BLOODY THING'S IN RADIANS
    let mz = Math.sin(angle*(pi/180))*speed;//this outputs the z motion I think
    let mx = Math.cos(angle*(pi/180))*speed;//should be the x motion
    if(u&&!d){returnlist[0] += mz; returnlist[1] += mx*-1;}
    if(d&&!u){returnlist[0] += mz*-1; returnlist[1] += mx;}
    if(l&&!r){returnlist[0] += mx; returnlist[1] += mz;}
    if(r&&!l){returnlist[0] += mx*-1; returnlist[1] += mz*-1;}
    //if(d&&u&&r){returnlist = returnlist[0] += mx*-1; returnlist[1] += mz*-1;}
    //if(d&&u&&l){returnlist = returnlist[0] += mx; returnlist[1] += mz;}
    return returnlist;
}
//sets to default when resizing
function resizeFOV(){
    fov = window.innerHeight;
}
//testing utility function //TODO: remove this when finished
function test(text){
    document.getElementById("tes").textContent = text;
}