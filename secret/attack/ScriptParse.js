var timesofsp = new Array();
var timeofsp = new Array();
var maxsize = 9;
var sizes = new Array();
var start;
var end;
var repeat = 15;
var current = 0;

function scriptDisplay()
{
    draw(sizes,timesofsp,"script");
}

function doScriptParse(index)
{	
    var s = document.createElement('script');
    start = performance.now();
    document.body.appendChild(s);
    s.src = "./" + index + "e5.js";
    window.onerror = function(){
        end = performance.now();
        console.log(end - start);
        if(current < 5){
            current++;
            doScriptParse(index);
        }
        else if(current < repeat){
            current++;
            timeofsp.push(end-start);
            doScriptParse(index);
        }else{
            timeofsp.sort(sortNumber);
            timesofsp.push([index,timeofsp[Math.floor(timeofsp.length/2)]]);
            timeofsp = [];
            sizes.push(index);
            current = 0;
            scriptDisplay();
            if(index < maxsize)doScriptParse(index+1);
        }
    };
}

function scriptParse()
{
    timesofsp = new Array();
    doScriptParse(1);
}

function sortNumber(a,b) {
        return a - b;
}
