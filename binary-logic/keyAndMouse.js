//input controls file
(function () {
    window.Key = {
        escape: "Escape", f1: "F1", f2: "F2", f3: "F3", f4: "F4", f5: "F5", f6: "F6", f7: "F7", f8: "F8", f9: "F9", f10: "F10", f11: "F11", f12: "F12", scrollLock: "ScrollLock", pause: "Pause", 
        tilde: "~", exclamation: "!", at: "@", hash: "#", dollar: "$", percent: "%", carrot: "^", and: "&", asterisk: "*", leftParen: "(", rightParen: ")", underscore: "_", plus: "+",
        backtick: "`",one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", zero: "0", minus: "-", equals: "=", backspace: "Backspace",
        insert: "Insert", home: "Home", pageup: "PageUp", delete: "Delete", end: "End", pagedown: "PageDown", numLock: "NumLock",
        tab: "Tab", q: "q", w: "w", e: "e", r: "r", t: "t", y: "y", u: "u", i: "i", o: "o", p: "p", leftSquare: "[", rightSquare: "]", leftBracket: "{", rightBracket: "}",
        capsLock: "CapsLock", a: "a", s: "s", d: "d", f: "f", g: "g", h: "h", j: "j", k: "k", l: "l", semicolon: ";", colon: ":", singleQuote: "'", doubleQuote: "\"", bar: "|", backslash: "\\", enter: "Enter",
        shift: "Shift", z: "z", x: "x", c: "c", v: "v", b: "b", n: "n", m: "m", comma: ",", period: ".",  leftCarrot: "<", rightCarrot: ">", slash: "/", question: "?",
        ctrl: "Control", meta: "Meta", alt: "Alt", space: " ", menu: "ContextMenu", arrowLeft: "ArrowLeft", arrowRight: "ArrowRight", arrowUp: "ArrowUp", arrowDown: "ArrowDown",
        pressed: {},
        isDown: function (key){return this.pressed[key.toLowerCase()];},
        keydown: function (event){this.pressed[event.key.toLowerCase()] = true;},
        keyup: function (event){delete this.pressed[event.key.toLowerCase()];}
    }

    window.addEventListener("keyup", (e) => window.Key.keyup(e));
    window.addEventListener("keydown", (e) => window.Key.keydown(e));

    window.Mouse = {left:false, middle:false, right:false, x:0, y:0, zoom:{deltaX:0, deltaY:0, deltaZ:0}};
    window.addEventListener('blur', () => {
        Key.pressed = {}
    });
    //disables context menu on right click
    window.addEventListener("contextmenu", e => e.preventDefault());
    document.addEventListener('mousedown', (e) => {
        if(e.button==0){Mouse.left = true;}
        if(e.button==1){Mouse.middle = true;}
        if(e.button==2){Mouse.right = true;}
    });
    document.addEventListener('mouseup', (e) => {
        if(e.button==0){Mouse.left = false;}
        if(e.button==1){Mouse.middle = false;}
        if(e.button==2){Mouse.right = false;}
    });
    addEventListener("wheel", (e) => {
        Mouse.zoom.deltaX = e.deltaX
        Mouse.zoom.deltaY = e.deltaY
        Mouse.zoom.deltaZ = e.deltaZ
        setTimeout(()=>{
            Mouse.zoom.deltaX = 0
            Mouse.zoom.deltaY = 0
            Mouse.zoom.deltaZ = 0
        },100);
    })

    document.addEventListener('mousemove', (e) => {
        Mouse.x = e.clientX;
        Mouse.y = e.clientY; 
    });

    window.addEventListener("contextmenu", e => e.preventDefault());
})();
