var c = document.getElementById("backcanvas");
var ctx = c.getContext("2d");

//chinese characters - taken from the unicode charset
var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
///converting the string into an array of single characters
chinese = chinese.split("");

var font_size = 10;
//an array of drops - one per column
var drops = [];
var columns = c.width/font_size; //number of columns for the rain

var titles = [indexTxt,resumeTxt,projectsTxt,demoTxt];
var alphas = [0,0,0,0];
var flags = [true,false,false,false];
var wbs=[-0.05*c.width,0,0,0];
var hbs=[0,0,0,0];

function refreshSize(){
    if(window.innerWidth == c.width && drops.length > 0)return;
    oldc = drops.length;
    c.width = window.innerWidth;
    columns = c.width/font_size; //number of columns for the rain
    for(var x = oldc; x < columns; x++)
        drops[x] = Math.random()*c.height/font_size; 
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(0, 0, c.width, c.height);
}

//drawing the characters
function draw()
{
    refreshSize();
    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = "#0F0"; //green text
    ctx.font = font_size + "px arial";
    //looping over drop
    for(var i = 0; i < drops.length; i++)
    {
        //a random chinese character to print
        var text = chinese[Math.floor(Math.random()*chinese.length)];
        //x = i*font_size, y = value of drops[i]*font_size
        ctx.fillText(text, i*font_size, drops[i]*font_size);
        
        if(drops[i]*font_size > c.height && Math.random() > 0.9)
            drops[i] = 0;                                                                                       
        
        drops[i]++;
    }

    for(var i = 0; i < titles.length; i++)
        alphas[i] = drawTxt(titles[i], c, flags[i], alphas[i],wbs[i],hbs[i]);
}

function changePage(page)
{
    for(var i = 0; i < titles.length; i++)flags[i]=false;
    flags[page] = true;
}

setInterval(draw, 80);
