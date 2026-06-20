function resizeCanvas(){
console.log("resizeCanvas new version");
    const wrap =
    document.querySelector(
        ".canvas-wrap"
    );

    if(
        typeof currentProduct ===
        "undefined"
    ){

        canvas.width =
        canvas.offsetWidth;

        canvas.height =
        canvas.offsetHeight;

        return;

    }

   if(
    typeof currentProduct !== "undefined"
    &&
    currentProduct === "idcard"
){

        const config =
        ID_PHOTO_CONFIG[
            currentIdPhoto
        ];

        if(config){

            const ratio =

            config.width /
            config.height;

            let width =

            wrap.offsetWidth;

            let height =

            width /
            ratio;

            const maxHeight =

            window.innerHeight *
            0.65;

            if(
                height >
                maxHeight
            ){

                height =
                maxHeight;

                width =
                height *
                ratio;

            }

            canvas.style.width =
            width + "px";

            canvas.style.height =
            height + "px";

        }

    }else{

        canvas.style.width =
        "";

        canvas.style.height =
        "";

    }

    canvas.width =
    canvas.offsetWidth;

    canvas.height =
    canvas.offsetHeight;

    if(image){

        imgX =
        canvas.width / 2;

        imgY =
        canvas.height / 2;

        fitImageCover();

    }

    draw();

}
