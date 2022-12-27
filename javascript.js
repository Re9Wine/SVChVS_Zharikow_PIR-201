function dropper_button_click(){
    let body = document.querySelector('body');
    let dropup_content = body.querySelector('.dropup-content');
    let dropup_content_nav = dropup_content.querySelector('nav');

    if(dropup_content.style.display == 'none'){
        dropup_content.style.display = 'flex';
        dropup_content_nav.style.display = 'flex';
        body.style.overflow = 'hidden';
    }
    else{
        dropup_content.style.display = 'none';
        dropup_content_nav.style.display = 'none';
        body.style.overflow = 'auto';
    }
}

// 1229