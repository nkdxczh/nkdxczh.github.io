function jump(page){
    changePage(page);
    if(page == 1){
        $('#resume').show();
    }
    else{
        $('#resume').hide();
    }
    if(page == 2){
        $('#projects').show();
    }else{
        $('#projects').hide();
    }
    if(page == 3){
        $('#demo').show();
        $('#demo').attr('src','attack/index.html');
    }else{
        $('#demo').hide();
    }
}
