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
