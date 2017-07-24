var inputReady = true;
var input = $('.404-input');
input.focus();
$('.container').on('click', function(e){
    input.focus();
});

input.on('keyup', function(e){
    $('.new-output').text(input.val());
});

$('.four-oh-four-form').on('submit', function(e){
    e.preventDefault();
    var val = $(this).children($('.404-input')).val().toLowerCase();
    var href;

    if (val == 'resume'){
        jump(1);
        resetForm(true);
    }
    else if(val == 'homepage'){
        jump(0);
        resetForm(true);
    }
    else {
        resetForm(false);
    }
});

function resetForm(found){
    var message = "Sorry that command is not recognized."
        var input = $('.404-input');

    if (found){
        message = "";
    }

    $('.new-output').removeClass('new-output');
    input.val('');
    if(!found)$('.terminal').append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
    else $('.terminal').append('<p class="prompt output new-output"></p>');

    $('.terminal').animate({scrollTop: $('.terminal').height()}, 1000);

    $('.new-output').velocity(
            'scroll'
            ), {duration: 100}
}

function textEffect(line){
    var alpha = [';', '.', ',', ':', ';', '~', '`'];
    var animationSpeed = 10;
    var index = 0;
    var string = line.text();
    var splitString = string.split("");
    var copyString = splitString.slice(0);

    var emptyString = copyString.map(function(el){
        return [alpha[Math.floor(Math.random() * (alpha.length))], index++];
    })

    emptyString = shuffle(emptyString);

    $.each(copyString, function(i, el){
        var newChar = emptyString[i];
        toUnderscore(copyString, line, newChar);

        setTimeout(function(){
            fromUnderscore(copyString, splitString, newChar, line);
        },i * animationSpeed);
    })
}

function toUnderscore(copyString, line, newChar){
    copyString[newChar[1]] = newChar[0];
    line.text(copyString.join(''));
}

function fromUnderscore(copyString, splitString, newChar, line){
    copyString[newChar[1]] = splitString[newChar[1]];
    line.text(copyString.join(""));
}


function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
