var endDate = new Date("2094-3-7");

function refreshTime(){
    var last = endDate - Date.now();
    last /= 1000;
    year = Math.floor(last/(60*60*24*365));
    last -= year*(60*60*24*365);
    day = Math.floor(last/(60*60*24));
    last -= day*(60*60*24);
    hour = Math.floor(last/(60*60));
    last -= hour*(60*60);
    min = Math.floor(last/(60));
    last -= min*(60);
    sec = Math.floor(last);

    document.getElementById("day").innerHTML = year+" Years ,"+day+" Days, "+hour+' Hours, '+min+' Min, '+sec+' Sec';
}

setInterval(refreshTime, 1000);
