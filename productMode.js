photoBtn.onclick = ()=>{

    productType = "photo";
    lightMode = 0;
    lightModeBtn.style.display =
    "none";

    if(image){

fitImageCover();

    }

    draw();
texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    // 右边

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    // 上边

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    // 下边

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});
draw();
};
mirrorBtn.onclick = ()=>{

    productType = "mirror";

    lightModeBtn.style.display =
    "block";

    if(image){

        const frameWidth = 12;
        const frameHeight = 17.5;

        const visibleWidth = 9.8;
        const visibleHeight = 15.3;

        const marginX = 20;

        const outerW =
        canvas.width - marginX * 2;

        const outerH =
        canvas.height - marginX * 2;

        const visibleW =
        outerW *
        (visibleWidth / frameWidth);

        const visibleH =
        outerH *
        (visibleHeight / frameHeight);

        const scaleX =
        visibleW / image.width;

        const scaleY =
        visibleH / image.height;

        imgScale =
        Math.max(scaleX, scaleY);

    }

    draw();


texts.forEach(text=>{

    const box =
    getTextBounds(text);

    const LIMIT = 10;

    // 左边

    if(
        box.left <
        exportVisibleX + LIMIT
    ){

        text.x +=
        (
            exportVisibleX +
            LIMIT
        )
        -
        box.left;

    }

    // 右边

    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        text.x -=
        box.right
        -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    // 上边

    if(
        box.top <
        exportVisibleY + LIMIT
    ){

        text.y +=
        (
            exportVisibleY +
            LIMIT
        )
        -
        box.top;

    }

    // 下边

    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        text.y -=
        box.bottom
        -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

    text.rx =

    (
        text.x -
        exportVisibleX
    )
    /
    exportVisibleW;

    text.ry =

    (
        text.y -
        exportVisibleY
    )
    /
    exportVisibleH;

});

draw();
};
