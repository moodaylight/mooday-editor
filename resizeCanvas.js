function resizeCanvas(){

    canvas.width = canvas.offsetWidth;

    canvas.height = canvas.offsetHeight;

    if(image){

        imgX = canvas.width / 2;

        imgY = canvas.height / 2;

        fitImageCover();

    }

    draw();

}
