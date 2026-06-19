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
