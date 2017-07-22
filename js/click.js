function jump(page){
    changePage(page);
    if(page == 1){
        $('#resume').show();
        $('#resume').attr("src",'doc/resume.pdf');
    }
    else{
        $('#resume').hide();
    }
}
