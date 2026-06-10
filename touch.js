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
