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
    "touchstart",
    handleTouchStart
    );

    canvas.addEventListener(
    "touchmove",
    handleTouchMove
    );

    canvas.addEventListener(
    "touchend",
    handleTouchEnd
    );

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

    selectedText =
    clickedText;

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

    if(
        textEditorPanel.style.display
        === "block"
    ){

        editorInput.value =
        clickedText.content;

    }

}
function selectImageForEdit(){

    imageSelected = true;

    clearSelectedText();

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

    initialPinchCenterX =

    (
        e.touches[0].clientX +
        e.touches[1].clientX
    )
    / 2;

    initialPinchCenterY =

    (
        e.touches[0].clientY +
        e.touches[1].clientY
    )
    / 2;

    initialImgX = imgX;

    initialImgY = imgY;

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

    const touch =
    e.touches[0];

    const x =
    touch.clientX - rect.left;

    const y =
    touch.clientY - rect.top;

    const clickedText =
    getTopText(x,y);

    if(clickedText){

        selectTextForDrag(
            clickedText,
            x,
            y
        );

        startLongPress(()=>{

            if(draggingText){

                openTextEditor(
                    clickedText
                );

            }

        });

        draw();

        return;

    }

    selectImageMode();

    startImageDrag(
        x,
        y
    );

    draw();

    return;

}
function handleTouchMove(e){

    e.preventDefault();

    const rect =
    canvas.getBoundingClientRect();

    if(e.touches.length === 1){

        const touch =
        e.touches[0];

        const x =
        touch.clientX - rect.left;

        const y =
        touch.clientY - rect.top;

        if(
            draggingText &&
            selectedText
        ){

            moveText(
                x,
                y
            );

            updateTextRelativePosition();

            const box =
            getTextBounds(
                selectedText
            );

            const LIMIT =
            getTextDragLimit();

            keepTextInsideBounds(
                box,
                LIMIT
            );

            updateTextRelativePosition();

        }

        if(
            draggingImage &&
            imageSelected
        ){

            moveImage(
                x,
                y
            );

        }

        draw();

    }

if(e.touches.length === 2){

    const currentDistance =
    getDistance(

        e.touches[0],

        e.touches[1]

    );

    const currentAngle =
    getAngle(

        e.touches[0],

        e.touches[1]

    );

    const scale =
    currentDistance /
    initialPinchDistance;

    const rotation =
    currentAngle -
    initialRotationAngle;

              if(imageSelected){

        imgScale =
        initialImageScale *
        scale;

        let frameWidth;
        let frameHeight;

        let visibleWidth;
        let visibleHeight;

        if(productType === "mirror"){

            frameWidth = 12;
            frameHeight = 17.5;

            visibleWidth = 9.8;
            visibleHeight = 15.3;

        }

        if(productType === "photo"){

            frameWidth = 4;
            frameHeight = 6;

            visibleWidth = 4;
            visibleHeight = 6;

        }

        const marginX = 20;

        const outerW =
        canvas.width -
        marginX * 2;

        const outerH =
        canvas.height -
        marginX * 2;

               const visibleRatioX =
        visibleWidth /
        frameWidth;

        const visibleRatioY =
        visibleHeight /
        frameHeight;

               const visibleW =
        outerW *
        visibleRatioX;

        const visibleH =
        outerH *
        visibleRatioY;

                const minScale =
        Math.max(

            visibleW /
            image.width,

            visibleH /
            image.height

        );

imgScale =
Math.max(
    imgScale,
    minScale
);

const currentCenterX =

(
    e.touches[0].clientX +
    e.touches[1].clientX
)
/ 2;

const currentCenterY =

(
    e.touches[0].clientY +
    e.touches[1].clientY
)
/ 2;

imgX =

initialImgX +

(
    currentCenterX -
    initialPinchCenterX
);

imgY =

initialImgY +

(
    currentCenterY -
    initialPinchCenterY
);

    }

    draw();

}

}
bindTouchEvents();
