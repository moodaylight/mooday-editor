// =====================
// Touch System
// =====================

function clearLongPress(){

    clearTimeout(longPressTimer);

}
function stopDragging(){

    draggingText = false;

    draggingImage = false;

}
function selectImageMode(){

    imageSelected = true;

    clearSelectedText();

    textEditorPanel.style.display = "none";

    fontPanel.style.display = "none";

    colorPanel.style.display = "none";

    sizePanel.style.display = "none";

    strokePanel.style.display = "none";

    shadowPanel.style.display = "none";

    opacityPanel.style.display = "none";

}
function startImageDrag(x,y){

    draggingImage = true;

    draggingText = false;

    dragOffsetX = x - imgX;

    dragOffsetY = y - imgY;

}
function moveImage(x,y){

    imgX = x - dragOffsetX;

    imgY = y - dragOffsetY;

}
function moveText(x,y){

    selectedText.x = x - textOffsetX;

    selectedText.y = y - textOffsetY;

}
function updateTextRelativePosition(){

    selectedText.rx =

    (
    selectedText.x -
    exportVisibleX
    )
    /
    exportVisibleW;

    selectedText.ry =

    (
    selectedText.y -
    exportVisibleY
    )
    /
    exportVisibleH;

}
function getTextDragLimit(){

    return 10;

}
function keepTextInsideBounds(box,LIMIT){

    // 左边界
    if(box.left < exportVisibleX + LIMIT){

        selectedText.x +=
        (exportVisibleX + LIMIT) - box.left;

    }

    // 右边界
    if(
        box.right >
        exportVisibleX +
        exportVisibleW -
        LIMIT
    ){

        selectedText.x -=
        box.right -
        (
            exportVisibleX +
            exportVisibleW -
            LIMIT
        );

    }

    // 上边界
    if(box.top < exportVisibleY + LIMIT){

        selectedText.y +=
        (exportVisibleY + LIMIT) - box.top;

    }

    // 下边界
    if(
        box.bottom >
        exportVisibleY +
        exportVisibleH -
        LIMIT
    ){

        selectedText.y -=
        box.bottom -
        (
            exportVisibleY +
            exportVisibleH -
            LIMIT
        );

    }

}
function handleTouchEnd(){

    clearLongPress();

    stopDragging();

}
