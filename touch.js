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
function bindTouchEvents(){

    canvas.addEventListener(
    "touchend",
    ()=>{

        handleTouchEnd();

    });
canvas.addEventListener(
"touchstart",
(e)=>{

    e.preventDefault();

    const rect =
    canvas.getBoundingClientRect();

});
}
function getTouchPosition(touch,rect){

    return {

        x:
        touch.clientX - rect.left,

        y:
        touch.clientY - rect.top

    };

}
function startLongPress(callback){

    longPressTimer =
    setTimeout(
        callback,
        600
    );

}
function openTextEditor(clickedText){

    textEditorPanel.style.display =
    "block";

    editorInput.value =
    clickedText.content;

}
function selectTextForDrag(
    clickedText,
    x,
    y
){

    selectedText =
    clickedText;

    imageSelected =
    false;

    draggingText =
    true;

    textOffsetX =
    x - clickedText.x;

    textOffsetY =
    y - clickedText.y;

    draggingImage =
    false;

}
function selectImageForEdit(){

    imageSelected = true;

    selectedText = null;

    textEditorPanel.style.display =
    "none";

    fontPanel.style.display =
    "none";

    colorPanel.style.display =
    "none";

    sizePanel.style.display =
    "none";

    strokePanel.style.display =
    "none";

    shadowPanel.style.display =
    "none";

    opacityPanel.style.display =
    "none";

}
function initializePinchGesture(e){

    initialPinchDistance =
    getDistance(

        e.touches[0],

        e.touches[1]

    );

    initialRotationAngle =
    getAngle(

        e.touches[0],

        e.touches[1]

    );

    if(imageSelected){

        initialImageScale =
        imgScale;

    }

}
function handleTouchStart(e){

    e.preventDefault();

    const rect =
    canvas.getBoundingClientRect();

    if(e.touches.length === 2){

        initializePinchGesture(e);

        return;

    }

}
